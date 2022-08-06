const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input: { name } }, { db }) => {
    const newCategory = {
      id: uuid(),
      name: name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (
    parent,
    { input: { name, image, price, onSale, quantity, categoryId } },
    { db }
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
    db.products.push(newProduct);
    return newProduct;
  },
  addReview: (
    parent,
    { input: { id, title, rating, comment, date, productId } },
    { db }
  ) => {
    const newReview = {
      id: uuid(),
      title,
      rating,
      comment,
      date,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (_, { id }, { db }) => {
    db.categories = db.categories.filter((cateory) => cateory.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryid === id)
        return {
          ...product,
          categoryid: null,
        };

      return product;
    });

    return true;
  },
  deleteProduct: (_, { id }, { db }) => {
    console.log(id);
    db.products = db.products.filter((product) => {
      console.log(product.id, product.id !== id);
      return product.id !== id;
    });
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },
};
