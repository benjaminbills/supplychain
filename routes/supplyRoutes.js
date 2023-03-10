const express = require('express');
const supplyItemController = require('../controllers/supplyItemController');

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
 *           example: A4 Batteries
 *         category:
 *           type: string
 *           description: Item category e.g furniture, electronics
 *           example: Electronics
 *         description:
 *           type: string
 *           description: Item description
 *           example: Long Lasting Batteries
 *         manufacturer:
 *           type: string
 *           description: Item manufacturer
 *           example: Tesla
 *         cost:
 *           type: number
 *           description: cost of item
 *           example: 10
 *         color:
 *            type: string
 *            description: item color
 *            example: Black
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
 *     responses:
 *       200:
 *         description: created by item
 *         content:
 *           application/json:
 *             schema:
 *               item:
 *                 $ref: '#/components/schemas/Item'
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
  .post(supplyItemController.createItem)
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
 *         description: ID of the item to update
 *         required: true
 *     responses:
 *       200:
 *         description: Item by id
 *         content:
 *           application/json:
 *             schema:
 *               status: Success
 *               data:
 *                  item:
 *                    $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 *   patch:
 *     summary: update an item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the item to update
 *         required: true
 *     responses:
 *       200:
 *         description: Result of updated item
 *         content:
 *           application/json:
 *             schema:
 *               status: Success
 *               data:
 *                  item:
 *                    $ref: '#/components/schemas/Item'
 *       500:
 *          description: Some server error
 */

router
  .route('/:id')
  .get(supplyItemController.getOneItem)
  .patch(supplyItemController.updateItem);

module.exports = router;
