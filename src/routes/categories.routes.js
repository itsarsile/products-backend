const express = require('express');
const categoryController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);
module.exports = router;
