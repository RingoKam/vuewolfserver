const { ApolloServer, gql } = require("apollo-server");
const { typeDefs, resolvers } = require("./gql");
const { makeExecutableSchema } = require("graphql-tools");

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema, subscriptions: {
  onConnect: (connectionParams, webSocket, context) => {
    console.log(connectionParams, webSocket, context)
  },
  onDisconnect: (websocket, context) => {
    console.log(websocket, context)
  }
}});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
