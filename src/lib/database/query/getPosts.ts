import { dbconnection } from '../connection'

export async function getPosts() {
  try {
    const connected = await dbconnection()

    const query = 'SELECT * from post'
    const values: any = []

    const [data] = await connected.execute(query, values)
    connected.destroy()

    return data
  } catch (error) {
    console.log('database fetch error: ', error)

    return error
  }
}
