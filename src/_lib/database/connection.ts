import mysql from 'mysql2/promise'

export async function dbconnection(): Promise<mysql.Connection> {
  const createConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'posts',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  })

  return createConnection
}
