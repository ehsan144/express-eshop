import db from "../utils/db.server";
import {
    LoginResultModel,
    LoginUserModel,
    RefreshResultModel,
    RegisterUserModel,
    UserModel,
    VerifyResultModel
} from "./user.model";
import {hashPassword, verifyPassword} from "../utils/pass.lib";
import {createAccessToken, verifyAccessToken, refreshAccessToken} from "../utils/jwt.lib";
import log from "../utils/logger";

const UserSelectQuery = {

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


class UserService {


    async getAllUsers(): Promise<UserModel[]> {
        return db.user.findMany(
            {
                select: UserSelectQuery
            }
        )
    }

    async findUser(id: number): Promise<UserModel | null> {
        return db.user.findUnique({
            select: UserSelectQuery,
            where: {
                id: id
            }
        });

    }

    async registerUser(user: RegisterUserModel): Promise<UserModel> {
        return db.user.create({
            select: UserSelectQuery,
            data: {
                username: user.username,
                email: user.email,
                password: await hashPassword(user.password)
            }
        });
    }

    async loginUser(data: LoginUserModel): Promise<LoginResultModel> {
        try {
            const user = await db.user.findUnique({
                where: {
                    username: data.username
                },
                select: {
                    id: true,
                    username: true,
                    password: true
                }
            });
            if (!user) {
                return {
                    error: "username or password is wrong"
                }
            }
            const isVerifyUser = await verifyPassword(data.password, user.password);
            if (!isVerifyUser) {
                return {
                    error: "username or password is wrong"
                }
            }

            const tokens = await createAccessToken(user.id);
            return {
                error: false,
                username: user.username,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
            }
        } catch (e) {
            log.error(e)
            return {
                error: e as string
            }
        }

    }

    async verifyUser(access_token: string): Promise<VerifyResultModel> {
        try {
            const result = await verifyAccessToken(access_token)
            const user = await this.findUser(result.userId)
            if (!user) {
                return {
                    is_verified: false,
                    error: false
                }
            }
            return {
                error: false,
                is_verified: true,
                username: user.username,
                email: user.email
            }


        } catch (e) {
            log.error(e)
            return {
                error: e as string,
                is_verified: false
            }
        }

    }

    async refreshToken(refresh_token: string): Promise<RefreshResultModel> {
        try {
            const result = await refreshAccessToken(refresh_token)
            return {
                error: false,
                access_token: result.access_token
            }

        } catch (e) {
            log.error(e)
            return {
                error: e as string,
            }
        }

    }
}

export {UserService};