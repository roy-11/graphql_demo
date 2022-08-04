const { products, categories } = require("../db");

exports.Query = {
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
};
