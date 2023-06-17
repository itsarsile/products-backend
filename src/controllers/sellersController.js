/* eslint-disable camelcase */
const {
  selectAllSellers,
  selectSellerById,
  insertSeller,
  updateSeller,
  deleteSeller,
} = require('../models/seller');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const sellersController = {
  getAll: async (req, res) => {
    try {
      const data = await selectAllSellers();
      sendResponse(res, { data, message: 'Successfully retrieved sellers' }, true, 200);
    } catch (error) {
      logger.error(`Error occurred while retrieving sellers: ${error}`);
      sendResponse(res, { error }, false, 500, 'An error occurred while retrieving sellers.');
    }
  },
  getById: async (req, res) => {
    try {
      const sellerId = Number(req.params.id);
      const seller = await selectSellerById(sellerId);
      if (seller.length === 0) {
        sendResponse(res, { data: null, message: 'Seller not found.' }, false, 404);
      } else {
        sendResponse(res, { data: seller, message: 'Successfully retrieved seller.' }, true, 200);
      }
    } catch (error) {
      logger.error(`Error occurred while retrieving sellers: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while retrieving seller.' }, false, 500);
    }
  },
  create: async (req, res) => {
    try {
      const {
        email, password, name, contact, address,
      } = req.body;
      const sellerData = {
        email, password, name, contact, address,
      };
      const newSeller = await insertSeller(sellerData);

      sendResponse(res, { data: newSeller, message: 'Seller created successfully.' }, true, 201);
    } catch (error) {
      logger.error(`Error occurred while creating seller: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while creating seller.' }, false, 500);
    }
  },
  update: async (req, res) => {
    try {
      const sellerId = Number(req.params.id);
      const {
        email, password, name, contact, address,
      } = req.body;
      const sellerData = {
        email, password, name, contact, address,
      };
      const updatedSeller = await updateSeller(sellerId, sellerData);

      if (!updatedSeller) {
        sendResponse(res, null, false, 404, 'Seller not found.');
      } else {
        sendResponse(res, { data: sellerData, message: 'Seller updated successfully.' }, true, 200);
      }
    } catch (error) {
      logger.error(`Error occurred while updating seller: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while updating seller.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const sellerId = Number(req.params.id);
      const deletedSeller = await deleteSeller(sellerId);

      if (!deletedSeller) {
        sendResponse(res, null, false, 404, 'Seller not found.');
      } else {
        sendResponse(res, { data: deletedSeller, message: 'Seller deleted successfully.' }, true, 200);
      }
    } catch (error) {
      logger.error(`Error occurred while deleting seller: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while deleting seller.' }, false, 500);
    }
  },
};

module.exports = sellersController;
