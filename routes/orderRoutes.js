const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router
  .route('/')
  .get(orderController.getOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOneOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
module.exports = router;
