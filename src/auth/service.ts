import _ from "lodash";
import db from "../utils/db";
import {createAccessToken, refreshAccessToken, verifyAccessToken, RefreshResultModel} from "./utils/jwt";
import {hashPassword, verifyPassword} from "./utils/password";
import {LoginResultModel, LoginUserModel, VerifyResultModel} from "./models/Login";
import {RegisterUserModel, UserModel} from "./models/User";


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


export async function getAllUsers(): Promise<UserModel[]> {
    return db.user.findMany(
        {
            select: UserSelectQuery
        }
    )
}

export async function findUser(id: number): Promise<UserModel | null> {
    return db.user.findUnique({
        select: UserSelectQuery,
        where: {
            id: id
        }
    });
}


export async function registerUser(data: RegisterUserModel): Promise<UserModel> {

    return db.user.create({
        select: UserSelectQuery,
        data: {
            ..._.pick(data, ["username", "email"]),
            password: await hashPassword(data.password)
        }
    });

}

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

export async function verifyUser(access_token: string): Promise<VerifyResultModel> {
    const result = await verifyAccessToken(access_token)
    const user = await findUser(result.userId)
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


export async function refreshToken(refresh_token: string): Promise<RefreshResultModel> {
    const result = await refreshAccessToken(refresh_token)
    return {
        access_token: result.access_token
    }
}
