import _ from "lodash";
import type {Request, Response} from "express";
import {validationResult} from "express-validator";
import {PrismaClientKnownRequestError, PrismaClientValidationError} from "@prisma/client/runtime/library";
import {findUser, registerUser, loginUser, verifyUser, getAllUsers, refreshToken} from "./services";

export const getUsersController = async (req: Request, res: Response) => {

    const users = await getAllUsers()
    return users.length !== 0 ?
        res.status(200).json(users) :
        res.status(404).json({error: "No User found"});

}
export const getUserController = async (req: Request, res: Response) => {
    try {
        const validResult = validationResult(req);
        if (!validResult.isEmpty()) {
            const errors = validResult.array().map(value => value["msg"])
            return res.status(400).json({"error": errors});
        }

        const userId = parseInt(req.params.id, 10)
        const user = await findUser(userId)
        if (user) return res.status(200).json(user)
        else return res.status(404).json({error: "User not found"})
    } catch (e) {
        return res.status(400).json({error: e as string})
    }
}
export const createUserController = async (req: Request, res: Response) => {

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
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const validResult = validationResult(req);
        if (!validResult.isEmpty()) {
            const errors = validResult.array().map(value => value["msg"])
            return res.status(400).json({"error": errors});
        }

        const result = await loginUser({..._.pick(req.body, ['username', 'password'])})
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }
}
export const verifyTokenController = async (req: Request, res: Response) => {
    try {
        const validResult = validationResult(req);
        if (!validResult.isEmpty()) {
            const errors = validResult.array().map(value => value["msg"])
            return res.status(400).json({"error": errors});
        }

        const result = await verifyUser(req.body.access_token)
        if (!result.is_verified) return res.status(403).json(result)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }

}
export const refreshAccessToken = async (req: Request, res: Response) => {

    try {
        const validResult = validationResult(req);
        if (!validResult.isEmpty()) {
            const errors = validResult.array().map(value => value["msg"])
            return res.status(400).json({"error": errors});
        }

        const result = await refreshToken(req.body.refresh_token)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(400).json({error: e as string})
    }

}