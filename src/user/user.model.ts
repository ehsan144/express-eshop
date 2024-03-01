export interface ProfileModel {
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    imagePath: string | null;
}

export interface BaseUserModel {
    username: string;
    email: string;

}

export interface UserModel extends BaseUserModel {
    role: string;
    membership: string;
    profile: ProfileModel | null;

}

export interface RegisterUserModel extends BaseUserModel {
    password: string;
}

export interface LoginUserModel {
    username: string;
    password: string;
}

export type LoginResultModel = {
    access_token?: string;
    refresh_token?: string;
    error: string | false;
    username?: string;
}
export type RefreshResultModel = {
    access_token?: string;
    error: string | false;
}
export type VerifyResultModel = {
    error: string | false;
    is_verified: boolean;
    username?: string;
    email?: string;

}