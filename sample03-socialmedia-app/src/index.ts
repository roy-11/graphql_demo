import { ApolloServer } from "apollo-server";
import { Query } from "./resolvers";
import { typeDefs } from "./schema";
import { PrismaClient, Prisma } from "@prisma/client";

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ port }) => {
  console.log(`server ready on port:${port}`);
});
