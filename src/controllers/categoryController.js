const {
  selectAllCategories,
  insertCategory,
  deleteCategory,
  findCategoryById,
} = require('../models/category');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const categoryController = {
  getAll: async (req, res) => {
    try {
      const data = await selectAllCategories();
      sendResponse(res, { data, message: 'Successfully retrieved categories' }, true, 200);
    } catch (error) {
      logger.error(`Error occurred while retrieving categories: ${error}`);
      sendResponse(res, { error }, false, 500, 'An error occurred while retrieving categories.');
    }
  },
  create: async (req, res) => {
    try {
      const { name, image } = req.body;
      const categoryData = { name, image };
      const newCategory = await insertCategory(categoryData);
      sendResponse(res, { data: newCategory, message: 'Category created successfully.' }, true, 201);
    } catch (error) {
      logger.error(`Error occurred while creating category: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while creating category.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const categoryId = Number(req.params.id);
      const result = await findCategoryById(categoryId);
      if (result.length === 0) {
        sendResponse(res, { data: null, message: 'Category not found.' }, false, 404);
      } else {
        const deletedCategory = await deleteCategory(categoryId);
        sendResponse(res, { data: deletedCategory, message: 'Category deleted successfully.' }, true, 200);
      }
    } catch (error) {
      logger.error(`Error occurred while deleting category: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while deleting category.' }, false, 500);
    }
  },
};

module.exports = categoryController;
