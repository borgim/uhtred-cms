import { Post } from '../Post'
import { usePosts } from '@/hooks/usePosts'
import { Skeleton } from '../Post/Skeleton'

export const Posts = () => {
  const { posts, postsLoading, postsError } = usePosts()

  if (postsLoading) {
    return <Skeleton />
  }

  if (postsError) {
    return <>Error on fetching posts</>
  }

  const postExists =
    posts && Array.isArray(posts) ? (
      posts?.map((post, index) => {
        return <Post post={post} index={index} key={post.id} />
      })
    ) : (
      <Skeleton />
    )

  return (
    <section id="posts-list">
      <ul className="w-full flex flex-col gap-5">{postExists}</ul>
    </section>
  )
}
