import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String!
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
    userErrors: [UserErrors!]!
  }

  type AuthPayload {
    token: String
    userErrors: [UserErrors!]!
  }

  type UserErrors {
    message: String!
  }

  input PostInput {
    title: String
    content: String
  }
  
  input CredentialsInput {
    email: String!
    name: String!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
    postPublish(postId: ID!): PostPayload!
    postUnpublish(postId: ID!): PostPayload!
    signup(
      credentials: CredentialsInput!
      password: String!
      bio: String!
    ): AuthPayload!
    signin(credentials: CredentialsInput!): AuthPayload!; 
  }
`;