import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Posts } from '@/Components/Dashboard/PostsList'

export default function Dashboard() {
  return (
    <div className="p-4 text-white">
      <h1 className="font-extrabold text-2xl">Dashboard</h1>
      <Posts />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
