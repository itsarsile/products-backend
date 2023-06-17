/* eslint-disable camelcase */
const {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProductById,
} = require('../models/product');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const productsController = {
  getAll: async (req, res) => {
    try {
      const data = await selectAllProducts();
      sendResponse(res, data, 200, 'Successfully retrieved products');
    } catch (error) {
      logger.error(`Error occurred while retrieving products: ${error}`);
      sendResponse(res, { error }, false, 500, 'An error occurred while retrieving products.');
    }
  },
  getById: async (req, res) => {
    try {
      const productId = Number(req.params.id);
      const product = await selectProductById(productId);
      if (product.length === 0) {
        sendResponse(res, { data: null, message: 'Product not found.' }, false, 404);
      } else {
        sendResponse(res, { data: product, message: 'Successfully retrieved product.' }, true, 200);
      }
    } catch (error) {
      logger.error(`Error occurred while retrieving product: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while retrieving product.' }, false, 500);
    }
  },
  create: async (req, res) => {
    try {
      const {
        name, brand, description, image, rating, price, stock, category_id,
      } = req.body;
      const productData = {
        name, brand, description, image, rating, price, stock, category_id,
      };
      const newProduct = await insertProduct(productData);
      sendResponse(res, { data: newProduct, message: 'Product created successfully.' }, true, 201);
    } catch (error) {
      logger.error(`Error occurred while creating product: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while creating product.' }, false, 500);
    }
  },
  update: async (req, res) => {
    try {
      const productId = Number(req.params.id);
      const productData = req.body;
      const productExists = await findProductById(productId);

      if (productExists) {
        const updatedProduct = await updateProduct(productId, productData);
        sendResponse(res, { data: updatedProduct, message: 'Product updated successfully.' }, true, 200);
      } else {
        sendResponse(res, null, false, 404, 'Product not found.');
      }
    } catch (error) {
      logger.error(`Error occurred while updating product: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while updating product.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const productId = Number(req.params.id);
      const productExists = await findProductById(productId);

      if (productExists) {
        const deletedProduct = await deleteProduct(productId);
        sendResponse(res, { data: deletedProduct, message: 'Product deleted successfully.' }, true, 200);
      } else {
        sendResponse(res, null, false, 404, 'Product not found.');
      }
    } catch (error) {
      logger.error(`Error occurred while deleting product: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while deleting product.' }, false, 500);
    }
  },
};

module.exports = productsController;
