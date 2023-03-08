const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: User password
 */
/**
 * @openapi
 * tags:
 *   name: User
 *   description: Manages user login
 */
/**
 * @openapi
 * /api/users/signup:
 *   post:
 *     summary: Signup a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT authentication token for the newly signed up user
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

router.post('/signup', authController.signUp);
/**
 * @openapi
 * /api/users/:
 *   get:
 *     summary: get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authController.getAllUsers);
/**
 * @openapi
 * /api/users/update/{id}:
 *   patch:
 *     summary: Update user role
 *     tags: [User]
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
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The updated role of the user
 *                 example: "admin"
 *
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               token: string
 *       500:
 *         description: Some server error
 */

router.patch('/update/:id', authController.updateRole);
/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT authentication token for the newly signed up user
 *       500:
 *         description: Some server error
 */
router.post('/login', authController.login);
module.exports = router;
