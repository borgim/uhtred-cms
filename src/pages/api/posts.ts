// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { authOptions } from './auth/[...nextauth]'
import { getUser } from '@/_lib/database/query/getUser'
import { getPosts } from '@/_lib/database/query/getPosts'
import { deletePost } from '@/_lib/database/mutations/deletePost'
import { createPost } from '@/_lib/database/mutations/createPost'

export type IPost = {
  id: number
  title: string
  content: string
  status: string
  published_date: string
}
export interface IPostData {
  posts?: IPost[] | unknown
  role?: 'admin' | 'editor' | 'viewer'
  message?: string
  error?: unknown
}

const postBodySchema = z.object({
  title: z.string().min(5),
  content: z.string().optional(),
  status: z.union([z.literal('draft'), z.literal('published')]),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPostData>,
) {
  const session = await getServerSession(req, res, authOptions)
  const method = req.method
  const PostsToApi = await getPosts({})
  const loginResult = session
    ? await getUser({
        email: session?.user?.email,
        user: session?.user?.name,
      })
    : null

  const userRole = loginResult?.result?.role || 'viewer'

  const { id } = req.query
  const body = req.body ? JSON.parse(req.body) : ''
  const bodyData: z.TypeOf<typeof postBodySchema> = body

  const bodyValidation = postBodySchema.safeParse(bodyData)

  try {
    // if method is diffenrent from GET and there is no Session, unauthorized
    if (method !== 'GET' && !session) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    // if role is ADMIN
    if (userRole === 'admin' && method !== 'POST') {
      // and method is DELETE, delete post
      if (method === 'DELETE' && id !== '') {
        await deletePost({ id })

        return res.status(200).send({
          message: `item with id ${id} was deleted`,
        })
      }
      return res.status(200).send({ posts: PostsToApi })
    }

    if (userRole !== 'viewer' && method === 'POST') {
      // const bodyValidation = postBodySchema.safeParse(req.body)

      if (!bodyValidation.success) {
        return res.status(400).send({ message: bodyValidation.error.message })
      }

      await createPost({
        title: bodyValidation.data.title,
        content: bodyValidation.data.content,
        status: bodyValidation.data.status,
      })
    }

    if (userRole === 'viewer' && id) {
      return res
        .status(200)
        .send({ posts: await getPosts({ status: 'published', id }) })
    }

    return res
      .status(200)
      .send({ posts: await getPosts({ status: 'published' }) })
  } catch (serverError) {
    res.status(500).send({
      message: 'server error',
      error: JSON.stringify(serverError),
    })
  }
}
