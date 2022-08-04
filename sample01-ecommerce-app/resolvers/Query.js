exports.Query = {
  hello: () => {
    return "world!";
  },
  products: (_, __, { products }) => products,
  product: (_, { id }, { products }) => {
    return products.find((product) => product.id === id);
  },
  categories: (_, __, { categories }) => categories,
  category: (_, { id }, { categories }) => {
    return categories.find((category) => category.id === id);
  },
};
