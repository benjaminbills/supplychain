const express = require('express');
const supplyItemController = require('../controllers/supplyItemController');
const router = express.Router();

router
  .route('/')
  .post(supplyItemController.createItem)
  .get(supplyItemController.getAllItems);
router
  .route('/:id')
  .get(supplyItemController.getOneItem)
  .patch(supplyItemController.updateItem)
  .delete(supplyItemController.deleteItem);
module.exports = router;
