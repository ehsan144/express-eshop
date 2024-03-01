import {UserService} from "./user.service";
import express from "express";
import {RegisterUserModel} from "./user.model";

const userService = new UserService()

const userRouter = express()
userRouter.get("/", async (req, res) => {
    const users = await userService.getAllUsers()
    return users.length !== 0 ?
        res.status(200).json(users) :
        res.status(404).json({error: "No User found"});
})

userRouter.get("/:id", async (req, res) => {
    const userId = parseInt(req.params.id, 10)
    const user = await userService.findUser(userId)
    if (user) return res.status(200).json(user)
    else return res.status(404).json({error: "User not found"})
})
userRouter.post("/register", async (req, res) => {
    const user = await userService.registerUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    if (user) return res.status(200).json(user)
    else return res.status(404).json({error: "User not found"})
})
userRouter.post("/login", async (req, res) => {
    const result = await userService.loginUser({
        username: req.body.username,
        password: req.body.password
    })
    if (!result.error) return res.status(200).json(result)
    else return res.status(404).json({error: result.error})
})

userRouter.post("/verify", async (req, res) => {
    const result = await userService.verifyUser(req.body.access_token)

    if (!result.is_verified) return res.status(403).json(result)
    if (result.error)return res.status(400).json(result)
    res.status(200).json(result)

})

userRouter.post("/refresh", async (req, res) => {
    const result = await userService.refreshToken(req.body.refresh_token)
    if (!result.error) return res.status(400).json(result)
    return res.status(200).json(result)
})


export default userRouter;