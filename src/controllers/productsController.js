/* eslint-disable camelcase */
const {
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  countProductsData,
  selectAllProducts,
} = require('../models/product');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const productsController = {
  getAll: async (req, res) => {
    try {
      const {
        sortBy, sortOrder, search,
      } = req.query;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const data = await selectAllProducts(sortBy, sortOrder, search, limit, offset);

      const [count] = await countProductsData();
      const totalData = parseInt(count.count, 10);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      sendResponse(res, { data, message: 'Successfully retrieved products', pagination }, true, 200);
    } catch (error) {
      logger.error(`Error occurred while retrieving products: ${error}`);
      sendResponse(res, { message: error }, false, 500);
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
        name, brand, description, image, rating, price, stock,
      } = req.body;
      const [count] = await countProductsData();
      const id = Number(count.count) + 1;
      const productData = {
        id, name, brand, description, image, rating, price, stock,
      };
      await insertProduct(productData);
      sendResponse(res, { data: productData, message: 'Product created successfully.' }, true, 201);
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
