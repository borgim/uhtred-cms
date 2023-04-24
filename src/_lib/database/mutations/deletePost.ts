import { dbconnection } from '../connection'

interface IDeletePost {
  id: string | string[] | undefined
}

export async function deletePost({ id }: IDeletePost) {
  try {
    const connected = await dbconnection()

    const query = 'DELETE FROM posts WHERE id = ?'

    const result = await connected.execute(query, [id])

    return result
  } catch (error) {
    console.error(error)
  }
}
