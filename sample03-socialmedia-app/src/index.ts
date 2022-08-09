import { ApolloServer } from "apollo-server";
import { Query } from "./resolvers";
import { typeDefs } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
});

server.listen().then(({ port }) => {
  console.log(`server ready on port:${port}`);
});
