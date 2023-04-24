import { Post } from '../Post'
import { usePosts } from '@/hooks/usePosts'

export const Posts = () => {
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts()

  if (postsLoading) {
    return (
      <div className="flex flex-col gap-5">
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
    return <>Error on fetching posts</>
  }

  return (
    <section id="posts-list">
      <ul className="w-full flex flex-col gap-5">
        {posts?.map((post, index) => {
          return <Post post={post} index={index} key={post.id} />
        })}
      </ul>
    </section>
  )
}
