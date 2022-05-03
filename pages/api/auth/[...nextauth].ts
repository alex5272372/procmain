import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const authorize = async (credentials) => {
  // Add logic here to look up the user from the credentials supplied
  const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
  if (user) {
    // Any object returned will be saved in `user` property of the JWT
    return user
  } else {
    // If you return null then an error will be displayed advising the user to check their details.
    return null
    // You can also Reject this callback with an Error thus the user will be sent to the error page
    // with the error message as a query parameter
  }
}

const options = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'jsmith@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      authorize
    }),
    /* GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }) */
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
