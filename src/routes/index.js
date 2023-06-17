const express = require('express');
const productsRouter = require('./products.routes');
const categoryRouter = require('./category.routes');
const customersRouter = require('./customers.routes');
const ordersRouter = require('./orders.routes');
const sellersRouter = require('./sellers.routes');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/category', categoryRouter);
router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);
router.use('/sellers', sellersRouter);

module.exports = router;
