exports.Query = {
  hello: () => {
    return "world!";
  },
  products: (_, { filter }, { db }) => {
    let filteredProducts = db.products;

    if (filter) {
      const { onSale, avgRating } = filter;

      // filter whether product is onsale or not
      if (onSale) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === onSale
        );
      }

      // filter greater than avgRating
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numbersOfReviews = 0;

          db.reviews.forEach((review) => {
            if (product.id === review.productId) {
              sumRating += review.rating;
              numbersOfReviews++;
            }
          });

          const avgProductRating = sumRating / numbersOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (_, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  categories: (_, __, { db }) => db.categories,
  category: (_, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
};
