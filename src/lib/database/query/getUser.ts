import { dbconnection } from '../connection'

interface IGetUser {
  user: string | undefined
  email: string | undefined
}

export async function getUser({ user, email }: IGetUser) {
  try {
    const connected = await dbconnection()

    const values: any = [user, email]

    const query =
      'SELECT name, email, role FROM users WHERE name = ? AND email = ?'

    const result = await connected.execute(query, values)
    connected.destroy()

    if (Array.isArray(result[0]) && result[0].length === 0) return false

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}
