import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export default function Dashboard() {
  return (
    <div className="text-white">
      <h1>Dashboard</h1>
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
