import '../styles/global.sass'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  </SessionProvider>
}
