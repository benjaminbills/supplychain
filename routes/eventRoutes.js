const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - event
 *         - location
 *         - custodian
 *       properties:
 *         event:
 *           type: string
 *           description: Product name
 *           example: Item has been dispatch to the supplier
 *         location:
 *           type: string
 *           description: Event category e.g furniture, electronics
 *           example: Moscow, Russia, Ulitsa Nametkina Dom 7
 *         custodian:
 *           type: string
 *           description: Event description
 *           example: Park House supplier
 */

/**
 * @openapi
 * tags:
 *   name: Event
 *   description: The supply item event API
 */
/**
 * @openapi
 * /api/item/{id}/event:
 *   post:
 *     summary: Create a new Event for an item
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the item
 *         required: true
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: event for an item
 *         content:
 *           application/json:
 *             schema:
 *               event:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all event for an item
 *     tags: [Event]
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the item
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *       200:
 *         description: The list of the item's event
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               events:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Some server error
 */

router
  .route('/:id/event')
  .post(eventController.createEvent)
  .get(eventController.getAllItemEvent);
/**
 * @openapi
 * /api/item/latest/{id}/event:
 *   get:
 *     summary: get latest event for an item
 *     tags: [Event]
 *     parameters:
 *       - name : id
 *         in: path
 *         description: ID of the item to get latest event
 *         required: true
 *     responses:
 *       200:
 *         description: Latest event of an Item
 *         content:
 *           application/json:
 *             schema:
 *               status: Success
 *               data:
 *                  item:
 *                    $ref: '#/components/schemas/Event'
 *       500:
 *         description: Some server error
 */

router.route('/latest/:id/event').get(eventController.getLatestEvent);

module.exports = router;
