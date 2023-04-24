import { useQuery } from 'react-query'
import { IPost } from '@/pages/api/posts'

interface IPostClient {
  posts: IPost[]
}

const postsData = async () => {
  const data = await fetch('/api/posts')
  const posts: IPostClient = await data.json()

  return posts.posts
}

export const usePosts = () => {
  return useQuery('posts', postsData)
}
