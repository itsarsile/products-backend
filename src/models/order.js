/* eslint-disable camelcase */
const sql = require('../configs/db.config');
const logger = require('../utils/logger');
const { selectProductById } = require('./product');

const selectAllOrders = async (limit, offset) => {
  let query = sql`SELECT * FROM "order_transactions"`;
  if (limit) {
    query = sql`${query} LIMIT ${limit}`;
  }

  if (offset) {
    query = sql`${query} OFFSET ${offset}`;
  }
  const data = await query;
  return data;
};

const selectOrderById = (id) => sql`
                  SELECT
                  order_transactions.id AS order_id,
                  products.id AS product_id,
                  products.name AS product_name,
                  order_transactions.quantity,
                  order_transactions.total_price,
                  products.price AS product_price
                  FROM
                  order_transactions
                  JOIN
                  products ON order_transactions.product_id = products.id
                  WHERE
                  order_transactions.id = ${id}`;

const calculateTotalPrice = async (product_id, quantity) => {
  try {
    // Retrieve the price of the product from the database
    const product = await selectProductById(product_id);
    const productPrice = product.price;

    // Calculate the total price by multiplying the quantity with the product price
    const total_price = productPrice * quantity;

    return total_price;
  } catch (error) {
    // Handle any errors that occur during the calculation
    logger.error(`Error occurred while calculating total price: ${error}`);
    throw new Error('An error occurred while calculating total price.');
  }
};

const createOrder = async (orderData) => {
  const {
    id, product_id, quantity,
  } = orderData;
  // const total_price = await calculateTotalPrice(product_id, quantity);
  return sql`
    INSERT INTO "order_transactions" (id, product_id, quantity)
    VALUES (${id}, ${product_id}, ${quantity})`;
};

const updateOrder = async (orderId, orderData) => {
  const { product_id, quantity } = orderData;
  return sql`
    UPDATE "order_transactions"
    SET product_id = ${product_id}, quantity = ${quantity}
    WHERE id = ${orderId}`;
};
const deleteOrder = (orderId) => sql`
    DELETE FROM "order_transactions"
    WHERE id = ${orderId}
  `;
const countOrdersData = () => sql`SELECT COUNT(*) FROM order_transactions`;
const findOrderById = (id) => sql`SELECT id FROM order_transactions WHERE id=${id}`;

module.exports = {
  selectAllOrders,
  selectOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  findOrderById,
  countOrdersData,
  calculateTotalPrice,
};
