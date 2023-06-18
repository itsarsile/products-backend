/* eslint-disable camelcase */
const sql = require('../configs/db.config');

const selectAllProducts = async (sortBy, sortOrder, search, limit, offset) => {
  let query = sql`SELECT * FROM products`;
  if (sortBy) {
    query = sql`${query} ORDER BY ${sql.unsafe(sortBy)} ${sql.unsafe(sortOrder)}`;
  }

  if (search) {
    query = sql`${query} WHERE name ILIKE '%' || ${search} || '%'`;
  }
  if (limit) {
    query = sql`${query} LIMIT ${limit}`;
  }

  if (offset) {
    query = sql`${query} OFFSET ${offset}`;
  }

  const data = await query;
  return data;
};
const selectProductById = (id) => sql`SELECT * FROM "products" WHERE id=${id}`;
const insertProduct = (productData) => {
  const {
    id, name, brand, description, image, rating, price, stock,
  } = productData;
  return sql`
    INSERT INTO "products" (
        id, name, brand, description, image, rating, price, stock
    ) VALUES (
       ${id}, ${name}, ${brand}, ${description}, ${image}, ${rating}, ${price}, ${stock}
    )`;
};

const updateProduct = (productId, productData) => {
  const {
    name, brand, description, image, rating, price, stock, category_id,
  } = productData;
  return sql`
    UPDATE "products" SET
        name=${name},
        brand=${brand},
        description=${description},
        image=${image},
        rating=${rating},
        price=${price}
        stock=${stock},
        category_id=${category_id}
        WHERE id=${productId}
  `;
};

const deleteProduct = (productId) => sql`
      DELETE FROM product
      WHERE id = ${productId}
    `;

const countProductsData = () => sql`SELECT COUNT(*) FROM products`;

const findId = (id) => sql`SELECT id FROM product WHERE id=${id}`;

module.exports = {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  findId,
  countProductsData,
};
