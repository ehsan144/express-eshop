import type {JwtPayload} from "jsonwebtoken";

export interface RefreshResultModel {
    access_token?: string;
}


export interface JwtTokens {
    access_token: string
    refresh_token?: string
}


export interface AccessToken extends JwtPayload {
    userId: number;
}

export interface RefreshToken extends AccessToken {

}