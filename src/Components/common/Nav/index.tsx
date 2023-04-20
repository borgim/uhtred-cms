import { ReactNode } from 'react'
import { ActiveLink } from '../ActiveLink'

export type IPageNavigation = {
  href: string
  children: ReactNode
}

interface INavigationProps {
  pages: IPageNavigation[]
}

export const Navigation = ({ pages }: INavigationProps) => {
  return (
    <nav className="flex gap-5 text-white">
      {pages.map((page) => {
        return (
          <ActiveLink
            href={page.href}
            activeCss="text-yellow-600"
            className="text-white"
            key={page.href}
          >
            {page.children}
          </ActiveLink>
        )
      })}
    </nav>
  )
}
