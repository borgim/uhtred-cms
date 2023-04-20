import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Login } from '@/Components/Home/Login'
import { HomeStory } from '@/Components/Home/Story'

export default function Home() {
  return (
    <div className="flex items-center justify-between h-screen text-white max-w-[1366px] px-4 my-0 mx-auto">
      <HomeStory />
      <Login />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
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
