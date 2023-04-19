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

    const actualDateFormated = `${actualDate.getFullYear()}-${actualDate.getMonth()}-${actualDate.getDay()}`

    console.log(actualDateFormated)

    const query = `INSERT INTO post VALUES (DEFAULT, '${title}', '${content}', '${actualDateFormated}', '${status}')`
    const values: any = []

    const conStatus: any = connected.execute(query, values)

    return conStatus
  } catch (error) {
    console.log(error)
  }
}
