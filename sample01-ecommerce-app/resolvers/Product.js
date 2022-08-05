exports.Product = {
  category: ({ categoryid }, _, { categories }) => {
    return categories.find((category) => category.id === categoryid);
  },
  reviews: ({ id }, _, { reviews }) => {
    return reviews.filter((review) => review.productId === id);
  },
};
