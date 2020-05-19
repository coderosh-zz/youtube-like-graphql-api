import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import express from 'express'

import { createContext } from './context'

const typesArray = fileLoader(path.join(__dirname, './types'))
const resolversArray = fileLoader(path.join(__dirname, './resolvers'))

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
})

const server = new GraphQLServer({
  schema,
  context: createContext,
})

server.express.use('/videos', express.static('videos'))

server.start(() => {
  console.log('server started')
})
