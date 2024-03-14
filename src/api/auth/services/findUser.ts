import {UserModel} from "../models/User";
import db from "../../../utils/db";

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

export async function findUser(id: number): Promise<UserModel | null> {
    return db.user.findUnique({
        select: UserSelectQuery,
        where: {
            id: id
        }
    });
}

