import { IPageNavigation, Navigation } from '../Nav'
import { Logo } from '../Logo'
import { signOut } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'

export const Header = () => {
  const pagesNavigation: IPageNavigation[] = [
    {
      href: '/dashboard',
      children: 'Posts',
    },
    {
      href: '/users',
      children: 'users',
    },
  ]

  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <Navigation pages={pagesNavigation} />
      <button
        onClick={() => signOut()}
        className="flex gap-2 bg-red-500 text-white p-2 rounded-md"
      >
        Logout
        <LogOutIcon />
      </button>
    </header>
  )
}
