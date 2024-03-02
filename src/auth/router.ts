import _ from "lodash";
import express from "express";
import {PrismaClientKnownRequestError, PrismaClientValidationError} from "@prisma/client/runtime/library";
import {findUser, registerUser, loginUser, verifyUser, getAllUsers, refreshToken} from "./service";


const router = express()
/**
 * @swagger
 * /api/auth/:
 *   get:
 *     summary: Get all users
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
router.post("/login", async (req, res) => {
    try {
        const result = await loginUser({..._.pick(req.body, ['username', 'password'])})
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }

})

router.post("/verify", async (req, res) => {
    try {
        const result = await verifyUser(req.body.access_token)
        if (!result.is_verified) return res.status(403).json(result)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }

})

router.post("/refresh", async (req, res) => {
    try {
        const result = await refreshToken(req.body.refresh_token)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }
})


export default router;