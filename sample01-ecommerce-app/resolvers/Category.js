exports.Category = {
  products: ({ id }, _, { products }) => {
    return products.filter((product) => product.categoryid === id);
  },
};
