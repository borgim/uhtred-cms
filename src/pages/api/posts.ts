// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '@/lib/database/query/getPosts'

type Post = {
  id: number
  title: string
  content: string
  status: string
  published_date: string
}
interface Data {
  posts: Post[] | unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ posts: await getPosts() })
}
