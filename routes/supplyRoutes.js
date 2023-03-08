const express = require('express');
const supplyItemController = require('../controllers/supplyItemController');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - manufacturer
 *         - cost
 *       properties:
 *         name:
 *           type: string
 *           description: Product name
 *         category:
 *           type: string
 *           description: Item category e.g furniture, electronics
 *         description:
 *           type: string
 *           description: Item description
 *         manufacturer:
 *           type: string
 *           description: Item manufacturer
 *         cost:
 *           type: number
 *           description: cost of item
 *
 */
/**
 * @openapi
 * tags:
 *   name: Item
 *   description: The supply item managing API
 */
/**
 * @openapi
 * /api/supply/:
 *   post:
 *     summary: Create a new Item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *         authorization:
 *             - bearerAuth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: get all items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('manufacturer', 'admin'),
    supplyItemController.createItem
  )
  .get(supplyItemController.getAllItems);
/**
 * @openapi
 * /api/supply/{id}:
 *   get:
 *     summary: get an item by id
 *     tags: [Item]
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *     responses:
 *       200:
 *         description: Item by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: delete an item
 *     tags: [Item]
 *     authorization:
 *             - bearerAuth
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *     responses:
 *       200:
 *         description: Delete an item
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: update an item
 *     tags: [Item]
 *     authorization:
 *             - bearerAuth
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 */

router
  .route('/:id')
  .get(supplyItemController.getOneItem)
  .patch(
    authController.protect,
    authController.restrictTo('manufacturer', 'admin'),
    supplyItemController.updateItem
  )
  .delete(
    authController.protect,
    authController.restrictTo('manufacturer', 'admin'),
    supplyItemController.deleteItem
  );
module.exports = router;
