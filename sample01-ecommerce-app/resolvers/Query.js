exports.Query = {
  hello: () => {
    return "world!";
  },
  products: (_, { filter }, { products, reviews }) => {
    let filteredProducts = products;

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

          reviews.forEach((review) => {
            if (product.id === review.productId) {
              sumRating += review.rating;
              numbersOfReviews++;
            }
          });

          const avgProductRating = sumRating / numbersOfReviews;
          console.log(sumRating, numbersOfReviews, avgProductRating, avgRating);
          return avgProductRating >= avgRating;
        });
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
