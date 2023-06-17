const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getById);
router.post('/', ordersController.create);
router.put('/:id', ordersController.update);
router.delete('/:id', ordersController.delete);

module.exports = router;
