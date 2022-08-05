const { reviews } = require("../db");

exports.Category = {
  products: ({ id }, { filter }, { products, reviews }) => {
    const categoryProducts = products.filter(
      (product) => product.categoryid === id
    );
    let filteredProducts = categoryProducts;

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
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
};
