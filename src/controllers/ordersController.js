/* eslint-disable camelcase */
const {
  selectAllOrders,
  selectOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  countOrdersData,
  calculateTotalPrice,
} = require('../models/order');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const ordersController = {
  getAll: async (req, res) => {
    try {
      const data = await selectAllOrders();
      sendResponse(res, { data, message: 'Successfully retrieved orders' }, true, 200);
    } catch (error) {
      logger.error(error);
    }
  },
  getById: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const order = await selectOrderById(orderId);
      if (order.length === 0) {
        sendResponse(res, { data: null, message: 'Order not found.' }, false, 404);
      }
      sendResponse(res, { data: order, message: 'Successfully retrieved customer.' }, true, 200);
    } catch (error) {
      logger.error(`Error occured while retrieving order: ${error}`);
      sendResponse(res, { error, message: 'An error occured while retrieving order.' }, false, 500);
    }
  },
  create: async (req, res) => {
    try {
      const {
        order_items,
      } = req.body;
      const [count] = await countOrdersData();
      const id = Number(count.count) + 1;
      const total_price = await calculateTotalPrice(id, order_items);
      const orderData = {
        id,
        order_items,
        total_price,
      };

      await createOrder(orderData);
      sendResponse(res, { data: orderData, message: 'Order created successfully' }, true, 201);
    } catch (error) {
      logger.error(`Error occured while creating order: ${error}`);
      sendResponse(res, { error, message: 'An error occured while creating order.' }, false, 500);
    }
  },
  update: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const {
        product_id, customer_id, order_date, shipping_cost, quantity, total_price,
      } = req.body;
      const orderData = {
        product_id,
        customer_id,
        order_date,
        shipping_cost,
        quantity,
        total_price,
      };
      const updatedOrder = await updateOrder(orderId, orderData);
      if (!updatedOrder) sendResponse(res, null, false, 404, 'Order not found');
      sendResponse(res, { data: orderData, message: 'Order updated successfully' });
    } catch (error) {
      logger.error(`Error occurred while updating customer: ${error}`);
      sendResponse(res, { error, message: 'An error occured while updating customer.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const deletedOrder = await deleteOrder(orderId);

      if (!deletedOrder) sendResponse(res, null, false, 'Order not found');

      sendResponse(res, { data: deletedOrder, message: 'Order deleted successfully' });
    } catch (error) {
      logger.error(`Error occurred while deleting customer: ${error}`);
      sendResponse(res, { error, message: 'An error occured while deleting customer.' }, false, 500);
    }
  },
};

module.exports = ordersController;
