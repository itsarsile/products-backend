const {
  selectAllCategories,
  insertCategory,
  deleteCategory,
  findId,
  countCategoriesData,
  selectCategoriesById,
  findCategoryId,
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
      const [count] = await countCategoriesData();
      const id = Number(count.count) + 1;
      const categoryData = { id, name, image };
      await insertCategory(categoryData);
      sendResponse(res, { data: categoryData, message: 'Category created successfully.' }, true, 201);
    } catch (error) {
      logger.error(`Error occurred while creating category: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while creating category.' }, false, 500);
    }
  },
  getById: async (req, res) => {
    try {
      const categoryId = Number(req.params.id);
      const category = await selectCategoriesById(categoryId);
      if (category.length === 0) {
        sendResponse(res, { data: null, message: 'Category not found.' }, false, 404);
      } else {
        sendResponse(res, { data: category, message: 'Successfully retrieved category.' }, true, 200);
      }
    } catch (error) {
      logger.error(`Error occurred while retrieving category: ${error}`);
      sendResponse(res, { error, message: 'An error occurred while retrieving category.' }, false, 500);
    }
  },
  delete: async (req, res) => {
    try {
      const categoryId = Number(req.params.id);
      const result = await findCategoryId(categoryId);
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
