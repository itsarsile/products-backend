const express = require('express');
const sellersController = require('../controllers/sellersController');

const router = express.Router();

router.get('/', sellersController.getAll);
router.get('/:id', sellersController.getById);
router.post('/', sellersController.create);
router.put('/:id', sellersController.update);
router.delete('/:id', sellersController.delete);

module.exports = router;
