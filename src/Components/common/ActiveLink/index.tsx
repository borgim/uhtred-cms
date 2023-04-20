import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface IActiveLinkProps extends LinkProps {
  activeCss?: string
  children: ReactNode
  className?: string
}

export const ActiveLink = ({
  children,
  activeCss,
  className,
  ...rest
}: IActiveLinkProps) => {
  const { asPath } = useRouter()

  const isActive = asPath === rest.href ? activeCss : ''

  const cssClass = `${isActive || className}`

  return (
    <Link {...rest} className={cssClass}>
      {children}
    </Link>
  )
}
