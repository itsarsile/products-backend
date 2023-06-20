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
const insertProduct = async (productData) => {
  const {
    id, name, brand, description, image, rating, price, category, stock,
  } = productData;
  await sql`
    INSERT INTO "products" (
        id, name, brand, description, image, rating, price, category, stock
    ) VALUES (
       ${id}, ${name}, ${brand}, ${description}, ${image}, ${rating}, ${price}, ${category}, ${stock}
    )`;
  const [rows] = await sql`
      SELECT id FROM categories WHERE name = ${category};
    `;

  if (rows.id) {
    await sql`
        INSERT INTO product_categories (product_id, category_id) VALUES (${id}, ${rows.id});
      `;
  }
};

const updateProduct = async (productId, productData) => {
  const {
    name, brand, description, image, rating, price, category, stock,
  } = productData;
  await sql`
    UPDATE "products" SET
        name=${name},
        brand=${brand},
        description=${description},
        image=${image},
        rating=${rating},
        price=${price},
        category=${category},
        stock=${stock}
        WHERE id=${productId}
  `;
};

const deleteProduct = (productId) => sql`
      DELETE FROM products
      WHERE id = ${productId}
    `;

const countProductsData = () => sql`SELECT COUNT(*) FROM products`;

const findProductById = (id) => sql`SELECT id FROM products WHERE id=${id}`;

module.exports = {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  countProductsData,
};
