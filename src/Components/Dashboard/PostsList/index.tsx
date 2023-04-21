import { useQuery } from 'react-query'
import { IPost } from '@/pages/api/posts'
import { Post } from '../Post'

interface IPostClient {
  posts: IPost[]
}

export const Posts = () => {
  const postsData = async () => {
    const data = await fetch('/api/posts')
    const posts: IPostClient = await data.json()

    return posts.posts
  }

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery('posts', postsData)

  if (postsLoading) {
    return (
      <div className="flex flex-col max-w-5xl gap-5">
        <span className="sr-only">Loading...</span>
        <div
          role="status"
          className="flex justify-between items-center px-4 h-20 rounded-md bg-gray-300 animate-pulse dark:bg-[#323232]"
        ></div>
        <div
          role="status"
          className="flex justify-between items-center px-4 h-20 rounded-md bg-gray-300 animate-pulse dark:bg-[#323232]"
        ></div>
        <div
          role="status"
          className="flex justify-between items-center px-4 h-20 rounded-md bg-gray-300 animate-pulse dark:bg-[#323232]"
        ></div>
      </div>
    )
  }

  if (postsError) {
    return <>Eror on fetching posts</>
  }

  return (
    <section id="posts-list" className="max-w-5xl">
      <ul className="w-full flex flex-col gap-5">
        {posts?.map((post, index) => {
          return <Post post={post} index={index} key={post.id} />
        })}
      </ul>
    </section>
  )
}
