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
    return <>Loading...</>
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
