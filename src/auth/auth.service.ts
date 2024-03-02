import _ from "lodash";
import db from "../utils/db.server";


import {
    LoginResultModel,
    LoginUserModel,
    RefreshResultModel,
    RegisterUserModel,
    AuthModel,
    VerifyResultModel
} from "./auth.model";
import {hashPassword, verifyPassword} from "./auth.password";
import {createAccessToken, refreshAccessToken, verifyAccessToken} from "./auth.jwt";


class AuthService {
    private UserSelectQuery = {

        id: true,
        username: true,
        email: true,
        role: true,
        membership: true,
        profile: {
            select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
                imagePath: true
            }
        }
    }


    async getAllUsers(): Promise<AuthModel[]> {
        return db.user.findMany(
            {
                select: this.UserSelectQuery
            }
        )
    }

    async findUser(id: number): Promise<AuthModel | null> {
        return db.user.findUnique({
            select: this.UserSelectQuery,
            where: {
                id: id
            }
        });
    }

    async registerUser(data: RegisterUserModel): Promise<AuthModel> {

        return db.user.create({
            select: this.UserSelectQuery,
            data: {
                ..._.pick(data, ["username", "email"]),
                password: await hashPassword(data.password)
            }
        });

    }

    async loginUser(data: LoginUserModel): Promise<LoginResultModel> {

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
        const isVerifyUser = await verifyPassword(data.password, user.password);
        if (!isVerifyUser) {
            throw new Error("username or password is wrong");
        }

        const tokens = await createAccessToken(user.id);
        return {
            ..._.pick(user, ["username", "email", "role"]),
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        }

    }

    async verifyUser(access_token: string): Promise<VerifyResultModel> {
        const result = await verifyAccessToken(access_token)
        const user = await this.findUser(result.userId)
        if (!user) {
            return {
                is_verified: false,
            }
        }
        return {
            is_verified: true,
            ..._.pick(user, ["username", "email"])
        }

    }


    async refreshToken(refresh_token: string): Promise<RefreshResultModel> {
        const result = await refreshAccessToken(refresh_token)
        return {
            access_token: result.access_token
        }
    }
}

export {AuthService};