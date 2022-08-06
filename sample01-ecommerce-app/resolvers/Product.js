exports.Product = {
  category: ({ categoryid }, _, { db }) => {
    return db.categories.find((category) => category.id === categoryid);
  },
  reviews: ({ id }, _, { db }) => {
    return db.reviews.filter((review) => review.productId === id);
  },
};
