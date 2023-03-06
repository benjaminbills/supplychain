const express = require('express');
const supplyItemController = require('../controllers/supplyItemController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('manufacturer', 'admin'),
    supplyItemController.createItem
  )
  .get(
    authController.restrictTo('manufacturer', 'user'),
    supplyItemController.getAllItems
  );
router
  .route('/:id')
  .get(supplyItemController.getOneItem)
  .patch(supplyItemController.updateItem)
  .delete(supplyItemController.deleteItem);
module.exports = router;
