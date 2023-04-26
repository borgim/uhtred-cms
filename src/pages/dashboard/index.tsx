import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { PlusIcon } from 'lucide-react'
import { Posts } from '@/Components/Dashboard/PostsList'

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="p-4 text-white">
      <section className="flex justify-between items-center">
        <h1 className="font-extrabold text-2xl mb-10">Dashboard</h1>
        <button
          onClick={() => router.push('/dashboard/createpost')}
          className="flex items-center bg-green-600 px-4 py-2 rounded-md font-bold text-lg gap-2"
        >
          <PlusIcon size={20} />
          Create new post
        </button>
      </section>
      <Posts />
      <br />
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
