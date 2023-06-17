/* eslint-disable camelcase */
const {
  selectAllCustomers,
  selectCustomerById,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../models/customer');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const customersController = {
  getAll: async (req, res) => {
    try {
      const data = await selectAllCustomers();
      sendResponse(res, { data, message: 'Successfully retrieved customers' }, true, 200);
    } catch (error) {
      logger.error(`Error occured while retrieving customers: ${error}`);
      sendResponse(res, { error }, false, 500, 'An error occurred while retrieving customers.');
    }
  },
  getById: async (req, res) => {
    try {
      const customerId = Number(req.params.id);
      const customer = await selectCustomerById(customerId);
      if (customer.length === 0) {
        sendResponse(res, { data: null, message: 'Customer not found.' }, false, 404);
      }

      sendResponse(res, { data: customer, message: 'Successfully retrieved customer.' }, true, 200);
    } catch (error) {
      logger.error(`Error occured while retrieving customers: ${error}`);
      sendResponse(res, { error, message: 'An error occured while retrieving customer.' }, false, 500);
    }
  },
  create: async (req, res) => {
    try {
      const {
        email, password, name, contact, address,
      } = req.body;
      const customerData = {
        email, password, name, contact, address,
      };
      const newCustomer = await insertCustomer(customerData);

      sendResponse(res, { data: newCustomer, message: 'Customer created successfully.' }, true, 201);
    } catch (error) {
      logger.error(`Error occured while creating customer: ${error}`);
      sendResponse(res, { error, message: 'An error occured while creating customer.' }, false, 500);
    }
  },
  update: async (req, res) => {
    try {
      const customerId = Number(req.params.id);
      const {
        email, password, name, contact, address,
      } = req.body;
      const customerData = {
        email, password, name, contact, address,
      };
      const updatedCustomer = await updateCustomer(customerId, customerData);

      if (!updatedCustomer) {
        sendResponse(res, null, false, 404, 'Customer not found.');
      }

      sendResponse(res, { data: customerData, message: 'Customer updated successfully.' }, true, 200);
    } catch (error) {
      logger.error(`Error occurred while updating customer: ${error}`);
      sendResponse(res, { error, message: 'An error occured while updating customer.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const customerId = Number(req.params.id);
      const deletedCustomer = await deleteCustomer(customerId);

      if (!deletedCustomer) {
        sendResponse(res, null, false, 404, 'Customer not found.');
      }

      sendResponse(res, { data: deletedCustomer, message: 'Customer updated successfully.' }, true, 200);
    } catch (error) {
      logger.error(`Error occurred while deleting customer: ${error}`);
      sendResponse(res, { error, message: 'An error occured while deleting customer.' }, false, 500);
    }
  },
};

module.exports = customersController;
