const sql = require('../configs/db.config');

const selectAllCategory = () => sql`SELECT * FROM category`;
const insertCategory = (categoryData) => {
  const { name, image } = categoryData;
  return sql`
      INSERT INTO category (name, image)
      VALUES (${name}, ${image})
    `;
};

const deleteCategory = (categoryId) => sql`
    DELETE FROM category
    WHERE id = ${categoryId}
`;

const findId = (id) => sql`SELECT id FROM category WHERE id=${id}`;

module.exports = {
  selectAllCategory, insertCategory, deleteCategory, findId,
};
