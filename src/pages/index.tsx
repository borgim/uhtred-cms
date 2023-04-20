import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <h1>Uhtred | CMS simulation</h1>
      {session ? (
        <>
          <p>signed in as {session?.user?.name}</p>
          <p>user name is {session?.user?.email}</p>
          <p>{session?.expires}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </>
  )
}
