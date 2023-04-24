// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { getUser } from '@/_lib/database/query/getUser'
import { getPosts } from '@/_lib/database/query/getPosts'
import { deletePost } from '@/_lib/database/mutations/deletePost'

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

  try {
    // if method is diffenrent from GET and there is no Session, unauthorized
    if (req.method !== 'GET' && !session) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    // if role is ADMIN
    if (userRole === 'admin') {
      // and method is DELETE, delete post
      if (method === 'DELETE' && id !== '') {
        await deletePost({ id })

        return res.status(200).send({
          message: `item with id ${id} was deleted`,
        })
      }
      return res.status(200).send({ posts: PostsToApi })
    }

    if (userRole !== 'viewer') {
      console.log('editor')
    }

    if (userRole === 'viewer' && id) {
      console.log('caiu aqui')
      return res
        .status(200)
        .send({ posts: await getPosts({ status: 'published', id }) })
    }

    return res
      .status(200)
      .send({ posts: await getPosts({ status: 'published' }) })
  } catch (serverError) {
    console.log('server error: ', serverError)

    res.status(500).send({
      message: 'server error',
      error: JSON.stringify(serverError),
    })
  }
}
