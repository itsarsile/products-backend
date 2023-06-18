const sql = require('../configs/db.config');

const selectAllCategories = () => sql`SELECT * FROM categories`;
const selectCategoriesById = (categoryId) => sql`SELECT * FROM categories WHERE id=${categoryId}`;
const insertCategory = (categoryData) => {
  const { id, name, image } = categoryData;
  return sql`
      INSERT INTO categories (id, name, image)
      VALUES (${id}, ${name}, ${image})
    `;
};

const deleteCategory = (categoryId) => sql`
    DELETE FROM categories
    WHERE id = ${categoryId}
`;

const countCategoriesData = () => sql`SELECT COUNT(*) FROM categories`;

const findCategoryId = (id) => sql`SELECT id FROM categories WHERE id=${id}`;

module.exports = {
  selectAllCategories,
  selectCategoriesById,
  insertCategory,
  deleteCategory,
  findCategoryId,
  countCategoriesData,
};
