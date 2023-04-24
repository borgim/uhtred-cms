import { dbconnection } from '../connection'

type IDType = string | string[] | undefined
interface IGetPosts {
  id?: IDType
  status?: string
}

export async function getPosts({ id, status }: IGetPosts) {
  try {
    const connected = await dbconnection()

    const whereConditions: string[] = []
    const values: Array<IDType> = []

    if (id) {
      whereConditions.push('id = ?')
      values.push(id)
    }

    if (status) {
      whereConditions.push('status = ?')
      values.push(status)
    }

    const whereClause =
      whereConditions.length !== 0
        ? `WHERE ${whereConditions.join(' AND ')}`
        : ''

    const query = `SELECT * from posts ${whereClause}`

    const [data] = await connected.execute(query, values)
    connected.destroy()

    return data
  } catch (error) {
    console.log('database fetch error: ', error)

    return error
  }
}
