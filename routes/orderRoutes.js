const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         quantity:
 *           type: number
 *           description: The quantity of the item being ordered
 *           example: 5
 *         orderLocation:
 *           type: string
 *           description: The location where the order was placed
 *           example: 'manufacturer'
 *         currentCustodian:
 *           type: string
 *           description: The user ID of the current custodian of the item
 *           example: '616fc53a5fbca9ac9a5a33cb'
 *         orderBy:
 *           type: string
 *           description: The user ID of the user who placed the order
 *           example: '616fc53a5fbca9ac9a5a33cb'
 *         item:
 *           type: string
 *           description: The ID of the item being ordered
 *           example: '616fc53a5fbca9ac9a5a33cb'
 *       required:
 *         - quantity
 *         - currentCustodian
 *         - orderBy
 *         - item
 */

/**
 * @openapi
 * tags:
 *   name: Order
 *   description: The Order managing API
 */
/**
 * @openapi
 * /api/order/:
 *   post:
 *     summary: Create a new Item
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
  .get(orderController.getOrders)
  .post(orderController.createOrder);

/**
 * @openapi
 * /api/order/{id}:
 *   get:
 *     summary: get all orders
 *     tags: [Order]
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: update an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */

router
  .route('/:id')
  .get(orderController.getOneOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
module.exports = router;
