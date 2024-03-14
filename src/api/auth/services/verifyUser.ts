import {VerifyResultModel} from "../models/Login";
import {Jwt} from "../utils/jwt";
import _ from "lodash";
import {findUser} from "../service";

export async function verifyUser(access_token: string): Promise<VerifyResultModel> {
    const result = await Jwt.verifyAccessToken(access_token)
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
