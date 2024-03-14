/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth services
 *   - name: Accounts
 *     description: Accounts
 * @swagger
 * /api/auth/:
 *   get:
 *     summary: Get all users
 *     tags : [Auth]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/Auth"
 * /api/auth/{id}:
 *   get:
 *     summary: Find a user
 *     tags : [Auth]
 *     parameters:
 *       - name: id
 *         description: Unique identifier of the user
 *         in: path
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/Auth"
 
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     tags : [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: take a new username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: enter password of the user
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/Auth"

 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags : [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: enter your username
 *               password:
 *                 type: string
 *                 description: enter your password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/LoginResult"
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify User Auth Token
 *     tags : [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access_token:
 *                 type: string
 *                 description: enter your access_token
 *             required:
 *               - access_token
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/VerifyResult"
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: generate new auth token from refresh token
 *     tags : [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: enter your refresh_token
 *             required:
 *               - refresh_token
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/RefreshResult"
 */