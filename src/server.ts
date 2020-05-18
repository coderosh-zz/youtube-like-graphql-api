import { GraphQLServer } from "graphql-yoga";

import { createContext } from './context'
import resolvers from "./resolvers";

const server = new GraphQLServer({
  resolvers,
  typeDefs: "./schema.graphql",
  context: createContext
});

server.start(() => {
  console.log("server started");
});
