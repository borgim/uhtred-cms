import { getUser } from '@/lib/database/query/getUser'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { use } from 'react'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ profile }) {
      const userName = profile?.login
      const email = profile?.email

      const userExists = await getUser({ user: userName, email })

      if (userExists) return true

      return false
    },
  },
})
