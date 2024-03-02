import _ from "lodash";
import express from "express";
import {PrismaClientKnownRequestError, PrismaClientValidationError} from "@prisma/client/runtime/library";
import {findUser, registerUser, loginUser, verifyUser, getAllUsers, refreshToken} from "./service";


const router = express()
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
 */
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers()
        return users.length !== 0 ?
            res.status(200).json(users) :
            res.status(404).json({error: "No User found"});
    } catch (e) {
        return res.status(400).json({error: e as string})
    }
})
/**
 * @swagger
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
 */
router.get("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10)
        const user = await findUser(userId)
        if (user) return res.status(200).json(user)
        else return res.status(404).json({error: "User not found"})
    } catch (e) {
        return res.status(400).json({error: e as string})
    }
})

/**
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
 */
router.post("/register", async (req, res) => {
    try {
        const user = await registerUser({..._.pick(req.body, ['username', 'password', 'email'])})
        if (user) return res.status(200).json(user)
        else return res.status(404).json({error: "User can not create"})
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") return res.status(400).json({error: "a user already exists with this request"})
            return res.status(400).json({error: e.message})
        } else if (e instanceof PrismaClientValidationError) {
            return res.status(400).json({error: "validation failed"})
        }
        return res.status(400).json({error: e})
    }
})

/**
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
 */
router.post("/login", async (req, res) => {
    try {
        const result = await loginUser({..._.pick(req.body, ['username', 'password'])})
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }

})
/**
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
 */
router.post("/verify", async (req, res) => {
    try {
        const result = await verifyUser(req.body.access_token)
        if (!result.is_verified) return res.status(403).json(result)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }

})

/**
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
router.post("/refresh", async (req, res) => {
    try {
        const result = await refreshToken(req.body.refresh_token)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }
})


export default router;