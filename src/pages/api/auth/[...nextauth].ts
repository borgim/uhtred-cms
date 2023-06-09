import NextAuth from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { getUser } from '@/_lib/database/query/getUser'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ profile }) {
      const userName = profile?.name
      const email = profile?.email

      const { userExists } = await getUser({ user: userName, email })

      if (userExists) return true

      return false
    },
  },
}

export default NextAuth(authOptions)
