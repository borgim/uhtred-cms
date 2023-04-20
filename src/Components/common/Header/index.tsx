import { IPageNavigation, Navigation } from '../Nav'
import { Logo } from '../Logo'

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
    <header className="flex items-center gap-x-28 p-4">
      <Logo />
      <Navigation pages={pagesNavigation} />
    </header>
  )
}
