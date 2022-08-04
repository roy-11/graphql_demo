exports.Product = {
  category: ({ categoryid }, _, { categories }) => {
    return categories.find((category) => category.id === categoryid);
  },
};
