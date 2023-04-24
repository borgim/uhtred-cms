import { dbconnection } from '../connection'

interface IGetUser {
  user: string | null | undefined
  email: string | null | undefined
}

interface IGetUserResult {
  name: string
  email: string
  role: string
}

interface IGetUserResponse {
  userExists?: boolean
  result?: IGetUserResult | null
}

export async function getUser({
  user,
  email,
}: IGetUser): Promise<IGetUserResponse> {
  try {
    const connected = await dbconnection()

    const values = [user, email]

    const query =
      'SELECT name, email, role FROM users WHERE name = ? AND email = ?'

    const [result] = await connected.execute(query, values)
    connected.destroy()

    const results = result as any[]

    if (results.length === 0) {
      return { userExists: false }
    }

    const newResult = results[0] as IGetUserResult

    return {
      userExists: true,
      result: newResult,
    }
  } catch (error) {
    console.log(error)

    return {
      userExists: false,
    }
  }
}
