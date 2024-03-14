import {LoginResultModel, LoginUserModel} from "../models/Login";
import db from "../../../utils/db";
import {Auth} from "../utils/password";
import {Jwt} from "../utils/jwt";
import _ from "lodash";

export async function loginUser(data: LoginUserModel): Promise<LoginResultModel> {

    const user = await db.user.findUnique({
        where: {
            username: data.username
        },
        select: {
            id: true,
            username: true,
            password: true,
            email: true,
            role: true
        }
    });
    if (!user) {
        throw new Error("username or password is wrong");
    }
    const isVerifyUser = await Auth.verifyPassword(data.password, user.password);
    if (!isVerifyUser) {
        throw new Error("username or password is wrong");
    }

    const tokens = await Jwt.createAccessToken(user.id);
    return {
        ..._.pick(user, ["username", "email", "role"]),
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
    }

}
