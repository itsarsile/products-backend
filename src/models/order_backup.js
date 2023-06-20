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
  const { order_items } = orderData;
  let query = sql`
    UPDATE "orders"
    SET order_items = `;

  // Iterate over each object in the order_items array
  for (let i = 0; i < order_items.length; i++) {
    const { product_id, quantity } = order_items[i];
    query = sql`${query} jsonb_set(order_items, '{${i},quantity}', '${sql.unsafe(product_id)}'::jsonb)`;
    query = sql`${query} jsonb_set(order_items, '{${i},quantity}', '${sql.unsafe(quantity)}'::jsonb)`;
    // Add a comma between updates except for the last iteration
    if (i !== order_items.length - 1) {
      query = sql`${query},`;
    }
  }

  query = sql`${query} WHERE id = ${orderId}`;

  return query;
};

const deleteOrder = (orderId) => sql`
    DELETE FROM "order"
    WHERE id = ${orderId}
  `;
const countOrdersData = () => sql`SELECT COUNT(*) FROM orders`;
const findOrderById = (id) => sql`SELECT id FROM orders WHERE id=${id}`;

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
