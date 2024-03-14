import express from "express";
import type {Express} from "express";
import {body, param} from "express-validator"
import {
    createUserController,
    getUserController,
    getUsersController,
    loginController,
    refreshAccessToken,
    verifyTokenController
} from "./controller";


const router: Express = express()

router.get("/", getUsersController)

router.get("/:id",
    param("id").notEmpty().withMessage("id Can't be Empty").isNumeric().withMessage("id must be Number"),
    getUserController
)

router.post("/register",
    body("username").notEmpty().withMessage("Username Can't be Empty"),
    body("email").notEmpty().withMessage("Email Can't be Empty"),
    body("password").notEmpty().withMessage("Password Can't be Empty"),
    createUserController
)

router.post("/login",
    body("username").notEmpty().withMessage("Username Can't be Empty"),
    body("password").notEmpty().withMessage("Password Can't be Empty"),
    loginController
)

router.post("/verify",
    body("access_token").notEmpty().withMessage("access_token Cant be Empty"),
    verifyTokenController
)

router.post("/refresh",
    body("refresh_token").notEmpty().withMessage("refresh_token Cant be Empty"),
    refreshAccessToken
)


export default router;