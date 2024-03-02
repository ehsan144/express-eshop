export interface LoginUserModel {
    username: string;
    password: string;
}

export type LoginResultModel = {
    access_token?: string;
    refresh_token?: string;
    username?: string;
    email?: string;
    role?: string;
}
export type VerifyResultModel = {
    is_verified: boolean;
    username?: string;
    email?: string;

}
