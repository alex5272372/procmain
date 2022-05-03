import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import { prisma } from '../../../lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'jsmith@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials: any) => {
        const user = await prisma.user.findUnique({
          select: {
            email: true,
            password: true,
            userRoles: { select: { role: true }}
          },
          where: { email: credentials.username }
        })
        if (user && user.password && user.userRoles
          && bcrypt.compareSync(credentials.password, user.password)
          && user.userRoles.find((userRole: any) => userRole.role === 'MODERATOR' || userRole.role === 'ADMINISTRATOR')
        )
          return user
        else return null
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) token.id = user.id
      return token
    },
    session: ({ session, token }: any) => {
      if (token) session.id = token.id
      return session
    }
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    encryption: true
  }
}

const authHandler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
export default authHandler
