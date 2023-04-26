import { NewPost } from '@/Components/Dashboard/NewPost'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export default function CreatePost() {
  return (
    <div className="p-4 text-white">
      <h1 className="font-extrabold text-2xl mb-10">Create new post</h1>
      <NewPost />
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
