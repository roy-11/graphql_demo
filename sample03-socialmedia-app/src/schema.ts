import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: DateTime!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    profile: Profile!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type PostPayload {
    post: Post
    userErrors: [userErrors!]!
  }

  type userErrors {
    message: String!
  }

  type Mustation {
    postCreate(title: String!, content: String!): PostPayload!
  }
`;
