exports.Query = {
  hello: () => {
    return "world!";
  },
  products: (_, { filter }, { products }) => {
    let filteredProducts = products;

    if (filter) {
      if (filter.onSale !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === filter.onSale
        );
      }
    }

    return filteredProducts;
  },
  product: (_, { id }, { products }) => {
    return products.find((product) => product.id === id);
  },
  categories: (_, __, { categories }) => categories,
  category: (_, { id }, { categories }) => {
    return categories.find((category) => category.id === id);
  },
};
