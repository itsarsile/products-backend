const express = require('express');
const productsRouter = require('./products.routes');
const categoriesRouter = require('./categories.routes');
const ordersRouter = require('./orders.routes');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);

module.exports = router;
