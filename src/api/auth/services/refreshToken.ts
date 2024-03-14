import {Jwt, RefreshResultModel} from "../utils/jwt";

export async function refreshToken(refresh_token: string): Promise<RefreshResultModel> {
    const result = await Jwt.refreshAccessToken(refresh_token)
    return {
        access_token: result.access_token
    }
}
