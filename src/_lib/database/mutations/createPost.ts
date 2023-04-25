import { format } from 'date-fns'
import { dbconnection } from '../connection'

interface ICreatePostProps {
  title?: string
  content?: string
  status?: 'published' | 'draft'
}

export async function createPost({ title, content, status }: ICreatePostProps) {
  try {
    const connected = await dbconnection()

    const actualDate = new Date()

    console.log(actualDate)

    const actualDateFormated = format(actualDate, 'yyyy-MM-dd')

    console.log(actualDateFormated)

    const query = `INSERT INTO posts VALUES (DEFAULT, ?, ?, ?, ?)`
    const values: any = [title, content, actualDateFormated, status]

    const conStatus: any = connected.execute(query, values)

    return conStatus
  } catch (error) {
    console.log(error)
  }
}
