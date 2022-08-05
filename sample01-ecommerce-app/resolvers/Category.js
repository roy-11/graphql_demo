exports.Category = {
  products: ({ id }, { filter }, { products }) => {
    const categoryProducts = products.filter(
      (product) => product.categoryid === id
    );
    let filteredProducts = categoryProducts;

    if (filter) {
      if (filter.onSale) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === filter.onSale
        );
      }
    }

    return filteredProducts;
  },
};
