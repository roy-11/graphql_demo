const { ApolloServer, gql } = require("apollo-server");
const products = require("./products");
const categories = require("./categories");

const typeDefs = gql`
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
  }

  type Category {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "world!";
    },
    products: () => products,
    product: (parent, args, context) => {
      const { id } = args;
      return products.find((product) => product.id === id);
    },
    categories: () => categories,
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
