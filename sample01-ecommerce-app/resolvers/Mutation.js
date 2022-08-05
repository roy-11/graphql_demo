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
};
