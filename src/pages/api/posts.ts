// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '@/lib/database/query/getPosts'

export type IPost = {
  id: number
  title: string
  content: string
  status: string
  published_date: string
}
export interface IPostData {
  posts: IPost[] | unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPostData>,
) {
  const PostsToApi = await getPosts()

  res.status(200).json({ posts: PostsToApi })
}
