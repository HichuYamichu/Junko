import gql from 'graphql-tag'

const typeDefs = gql`
  type Mutation {
    selectChannel(Channel: Channel): Channel
    selectMember(Member: Member): Member
  }

  type Query {
    SelectedChannel: Channel
    SelectedMember: Member
  }
`

const defaults = {
  SelectedChannel: null,
  SelectedMember: null
}

const resolvers = {
  Mutation: {
    selectChannel: (_, { Channel }, { cache }) => {
      const data = { SelectedChannel: Channel }
      cache.writeData({ data })
      return null
    },
    selectMember: (_, { Member }, { cache }) => {
      const data = { SelectedMember: Member }
      cache.writeData({ data })
      return null
    }
  }
}

const httpLinkOptions = {
  credentials: 'include'
}

const httpEndpoint = '/api/query'

export default function () {
  return {
    httpEndpoint,
    httpLinkOptions,
    typeDefs,
    resolvers,
    defaults
  }
}
