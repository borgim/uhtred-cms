import { useMutation, useQuery } from 'react-query'
import { IPost } from '@/pages/api/posts'

interface IPostClient {
  posts: IPost[]
}

const postsData = async () => {
  const data = await fetch('/api/posts')
  const posts: IPostClient = await data.json()

  return posts.posts
}

// const createPostApi = async () => {
//   await fetch('/api/posts', {
//     method: 'POST',
//     body: JSON.stringify({}),
//   })
// }

function deletePostApi(id: string) {
  return fetch(`/api/posts/?id=${id}`, {
    method: 'DELETE',
  })
}

export const usePosts = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    refetch: refetchPosts,
    error: postsError,
  } = useQuery('posts', postsData)

  const deletePostMutation = useMutation(
    (id: string) => {
      return deletePostApi(id)
    },
    {
      onSuccess: () => refetchPosts(),
    },
  )
  function deletePost(id: string) {
    deletePostMutation.mutate(id)
  }

  return { posts, postsLoading, postsError, deletePost }
}
