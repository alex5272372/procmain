import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: { Query: { fields: {
    users: { keyArgs: false }
  }}}
})

const apolloClient = new ApolloClient({ uri: '/api', cache })
export default apolloClient
