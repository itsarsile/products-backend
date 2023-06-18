/* eslint-disable camelcase */
const sql = require('../configs/db.config');
const logger = require('../utils/logger');

const selectAllOrders = () => sql`SELECT * FROM "orders"`;

const selectOrderById = (id) => sql`SELECT * FROM "orders" WHERE id=${id}`;

const calculateTotalPrice = async (orderId, orderItems) => {
  const totalPricePromises = orderItems.map(async (item) => {
    const { product_id, quantity } = item;
    const queryResult = await sql`
      SELECT price
      FROM products
      WHERE id = ${product_id}
    `;
    logger.info(orderId);

    const productPrice = queryResult[0].price;

    // Calculate the subtotal for the item (product price * quantity)
    const subtotal = productPrice * quantity;

    return subtotal;
  });

  const totalPriceArray = await Promise.all(totalPricePromises);

  // Calculate the total price by summing up the subtotals
  const total = totalPriceArray
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return total;
};
const createOrder = async (orderData) => {
  const {
    id, order_items,
  } = orderData;
  const total_price = await calculateTotalPrice(id, order_items);
  return sql`
    INSERT INTO "orders" (id, order_items, total_price)
    VALUES (${id}, ${order_items}, ${total_price})`;
};

const updateOrder = (orderId, orderData) => {
  const {
    product_id, customer_id, shipping_cost, quantity, total_price,
  } = orderData;
  return sql`
    UPDATE "orders" SET
    product_id=${product_id}, customer_id=${customer_id},
    shipping_cost=${shipping_cost}, quantity=${quantity}, total_price=${total_price}
    WHERE id=${orderId}`;
};

const deleteOrder = (orderId) => sql`
    DELETE FROM "order"
    WHERE id = ${orderId}
  `;
const countOrdersData = () => sql`SELECT COUNT(*) FROM orders`;

module.exports = {
  selectAllOrders,
  selectOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  countOrdersData,
  calculateTotalPrice,
};
