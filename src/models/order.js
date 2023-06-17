/* eslint-disable camelcase */
const sql = require('../configs/db.config');

const selectAllOrders = () => sql`SELECT * FROM "order"`;
const selectOrderById = (id) => sql`SELECT * FROM "order" WHERE id=${id}`;
const insertOrder = (orderData) => {
  const {
    product_id, customer_id, order_date, shipping_cost, quantity, total_price,
  } = orderData;
  return sql`
    INSERT INTO "order" (product_id, customer_id, order_date, shipping_cost, quantity, total_price)
    VALUES (${product_id}, ${customer_id}, ${order_date}, ${shipping_cost}, ${quantity}, ${total_price})`;
};

const updateOrder = (orderId, orderData) => {
  const {
    product_id, customer_id, order_date, shipping_cost, quantity, total_price,
  } = orderData;
  return sql`
    UPDATE "order" SET
    product_id=${product_id}, customer_id=${customer_id}, order_date=${order_date},
    shipping_cost=${shipping_cost}, quantity=${quantity}, total_price=${total_price}
    WHERE id=${orderId}`;
};

const deleteOrder = (orderId) => sql`
    DELETE FROM "order"
    WHERE id = ${orderId}
  `;

module.exports = {
  selectAllOrders,
  selectOrderById,
  insertOrder,
  updateOrder,
  deleteOrder,
};
