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
  const PostsToApi = await getPosts()
  const { result } = await getUser({
    email: session?.user?.email,
    user: session?.user?.name,
  })
  const userResult = result

  const { id } = req.query

  console.log('query: ', id)

  try {
    if (req.method === 'OPTIONS') {
      return res.status(405).send({ message: 'Method not allowed' })
    } else if (req.method !== 'GET' && !session) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    if (userResult?.role === 'admin') {
      return res.status(200).send({ posts: PostsToApi })
    }

    if (req.method === 'DELETE' && id !== '') {
      const deleteResult = await deletePost({ id })

      return res
        .status(200)
        .send({ message: `o id ${id} foi deletado, ${deleteResult}` })
    }

    return res.status(200).send({ posts: 'aiaiaiai' })
  } catch (serverError) {
    console.log('server error: ', serverError)

    res.status(500).send({
      message: 'server error',
      error: JSON.stringify(serverError),
    })
  }
}
