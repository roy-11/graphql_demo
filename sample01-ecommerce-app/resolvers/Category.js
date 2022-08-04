const { products } = require("../db");

exports.Category = {
  products: (parent) => {
    const { id } = parent;
    return products.filter((product) => product.categoryid === id);
  },
};
