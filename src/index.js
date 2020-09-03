import express from 'express'
import { makeSchema, queryType, stringArg } from '@nexus/schema'
import { ApolloServer } from 'apollo-server-express'

require('./db')

const Query = queryType({
  definition (t) {
    t.string('hello', {
      args: { name: stringArg({ nullable: true }) },
      resolve: (parent, { name }) => `Hello ${name || 'World'}!`,
    })
  },
})

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + '/schema.graphql'
  },
})

const server = new ApolloServer({ schema })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
