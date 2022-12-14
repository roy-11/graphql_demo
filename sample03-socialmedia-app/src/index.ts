import { ApolloServer } from "apollo-server";
import { Query, Mutation, Profile, Post } from "./resolvers";
import { typeDefs } from "./schema";
import { PrismaClient, Prisma } from "@prisma/client";
import { getUserFromToken } from "./utils/getUserFromToken";

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  } | null;
}

export const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
  },
  context: ({ req }) => {
    const { headers } = req;
    const userInfo = getUserFromToken(headers.authorization || "");
    return {
      userInfo,
      prisma,
    };
  },
});

server.listen().then(({ port }) => {
  console.log(`server ready on port:${port}`);
});
