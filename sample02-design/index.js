const { ApolloServer } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type ManualGroup {
    id: ID!
    name: String!
    image: ID!
    bodyHTML: String!
    memberships: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    image: ID!
    bodyHTML: String!
    memberships: [GroupMembership!]!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type AutomaticGroupFeatures {
    name: String!
  }

  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
