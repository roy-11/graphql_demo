const { categories } = require("../db");

exports.Product = {
  category: (parent) => {
    const { categoryid } = parent;
    return categories.find((category) => category.id === categoryid);
  },
};
