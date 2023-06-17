/* eslint-disable camelcase */
const sql = require('../configs/db.config');

const selectAllProduct = () => sql`SELECT * FROM "product"`;
const selectProductById = (id) => sql`SELECT * FROM "product" WHERE id=${id}`;
const insertProduct = (productData) => {
  const {
    name, brand, description, image, rating, price, stock, category_id,
  } = productData;
  return sql`
    INSERT INTO "product" (
        name, brand, description, image, rating, price, stock, category_id
    ) VALUES (
        ${name}, ${brand}, ${description}, ${image}, ${rating}, ${price}, ${stock}, ${category_id}
    )`;
};

const updateProduct = (productId, productData) => {
  const {
    name, brand, description, image, rating, price, stock, category_id,
  } = productData;
  return sql`
    UPDATE "product" SET
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

const findId = (id) => sql`SELECT id FROM product WHERE id=${id}`;

module.exports = {
  selectAllProduct, selectProductById, insertProduct, updateProduct, deleteProduct, findId,
};
