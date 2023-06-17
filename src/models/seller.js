/* eslint-disable camelcase */
const sql = require('../configs/db.config');

const selectAllSellers = () => sql`SELECT * FROM seller`;
const selectSellerById = (id) => sql`SELECT * FROM seller WHERE id=${id}`;
const insertSeller = (sellerData) => {
  const {
    email, password, name, contact, address,
  } = sellerData;
  return sql`
    INSERT INTO seller (email, password, name, contact, address)
    VALUES (${email}, ${password}, ${name}, ${contact}, ${address})`;
};

const updateSeller = (sellerId, sellerData) => {
  const {
    email, password, name, contact, address,
  } = sellerData;
  return sql`
    UPDATE seller SET
    email=${email}, password=${password}, name=${name}, contact=${contact}, address=${address}
    WHERE id=${sellerId}`;
};

const deleteSeller = (sellerId) => sql`
    DELETE FROM seller
    WHERE id = ${sellerId}
  `;

module.exports = {
  selectAllSellers,
  selectSellerById,
  insertSeller,
  updateSeller,
  deleteSeller,
};
