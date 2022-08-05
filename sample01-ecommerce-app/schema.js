const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    product(id: ID!): Product!
    categories: [Category!]!
    category(id: ID!): Category!
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryid: ID!
    category: Category!
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Review {
    id: ID!
    title: String!
    rating: Int!
    comment: String!
    date: String!
  }
`;
