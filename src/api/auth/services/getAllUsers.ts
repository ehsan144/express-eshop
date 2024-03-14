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

export async function getAllUsers(): Promise<UserModel[]> {
    return db.user.findMany(
        {
            select: UserSelectQuery
        }
    )
}
