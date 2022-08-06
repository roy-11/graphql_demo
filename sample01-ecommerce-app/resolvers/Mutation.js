const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input: { name } }, { categories }) => {
    const newCategory = {
      id: uuid(),
      name: name,
    };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (
    parent,
    { input: { name, image, price, onSale, quantity, categoryId } },
    { products }
  ) => {
    const newProduct = {
      id: uuid(),
      name,
      image,
      price,
      onSale,
      quantity,
      categoryId,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (
    parent,
    { input: { id, title, rating, comment, date, productId } },
    { reviews }
  ) => {
    const newReview = {
      id: uuid(),
      title,
      rating,
      comment,
      date,
      productId,
    };
    reviews.push(newReview);
    return newReview;
  },
};
