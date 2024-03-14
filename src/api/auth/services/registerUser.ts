import {RegisterUserModel, UserModel} from "../models/User";
import db from "../../../utils/db";
import _ from "lodash";
import {Auth} from "../utils/password";

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

export async function registerUser(data: RegisterUserModel): Promise<UserModel> {

    return db.user.create({
        select: UserSelectQuery,
        data: {
            ..._.pick(data, ["username", "email"]),
            password: await Auth.hashPassword(data.password)
        }
    });

}