/* eslint-disable camelcase */
const {
  selectAllOrders,
  selectOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  countOrdersData,
  findOrderById,
} = require('../models/order');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const ordersController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const data = await selectAllOrders(offset, limit);

      const [count] = await countOrdersData();
      const totalData = parseInt(count.count, 10);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      sendResponse(res, { data, message: 'Successfully retrieved orders', pagination }, true, 200);
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
        product_id, quantity,
      } = req.body;
      const [count] = await countOrdersData();
      const id = Number(count.count) + 1;
      const orderData = {
        id,
        product_id,
        quantity,
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
      const orderExists = findOrderById(orderId);
      const { product_id, quantity } = req.body;
      const orderData = {
        product_id,
        quantity,
      };
      await updateOrder(orderId, orderData);
      if (!orderExists) sendResponse(res, null, false, 404, 'Order not found');
      sendResponse(res, { data: orderData, message: 'Order updated successfully' });
    } catch (error) {
      logger.error(`Error occurred while updating order: ${error}`);
      sendResponse(res, { error, message: 'An error occured while updating order.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const deletedOrder = await deleteOrder(orderId);

      if (!deletedOrder) sendResponse(res, null, false, 'Order not found');

      sendResponse(res, { data: deletedOrder, message: 'Order deleted successfully' });
    } catch (error) {
      logger.error(`Error occurred while deleting order: ${error}`);
      sendResponse(res, { error, message: 'An error occured while deleting order.' }, false, 500);
    }
  },
};

module.exports = ordersController;
