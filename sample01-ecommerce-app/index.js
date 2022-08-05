const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { products, categories, reviews } = require("./db");

const resolvers = {
  Query,
  Category,
  Product,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    products,
    categories,
    reviews,
  },
});
server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
