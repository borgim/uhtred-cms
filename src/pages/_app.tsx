import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import { Header } from '@/Components/common/Header'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()

  const isHome = router.pathname === '/'

  return (
    <SessionProvider session={session}>
      {!isHome && <Header />}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
