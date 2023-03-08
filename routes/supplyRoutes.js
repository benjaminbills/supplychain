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
  .get(supplyItemController.getAllItems);
router
  .route('/:id')
  .get(supplyItemController.getOneItem)
  .patch(
    authController.restrictTo('manufacturer', 'admin'),
    supplyItemController.updateItem
  )
  .delete(
    authController.restrictTo('manufacturer', 'admin'),
    supplyItemController.deleteItem
  );
module.exports = router;
