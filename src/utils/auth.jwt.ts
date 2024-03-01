import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import httpError from 'http-errors';
import log from "./logger";

dotenv.config();

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    log.error("[SERVER] No secret key found")
    process.exit(1);
}

interface JwtTokens {
    access_token: string
    refresh_token?: string
}

export function createAccessToken(userId: number): Promise<JwtTokens> {
    return new Promise((resolve, reject) => {
        jwt.sign({"userId": userId}, REFRESH_TOKEN_SECRET as string, {expiresIn: "1d"}, (error, refresh_token) => {
            if (error) reject(new httpError.BadRequest());
            jwt.sign({"userId": userId}, ACCESS_TOKEN_SECRET as string, {expiresIn: "1h"}, (err, access_token) => {
                if (err) return reject(new httpError.BadRequest());
                resolve({
                    access_token: access_token as string,
                    refresh_token: refresh_token as string
                })
            });
        })
    })

}

interface AccessToken extends jwt.JwtPayload {
    userId: number;
}

interface RefreshToken extends AccessToken {

}

export function verifyAccessToken(token: string): Promise<AccessToken> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, ACCESS_TOKEN_SECRET as string, (err, payload) => {
            if (err) {
                return reject(new httpError.Unauthorized());
            }
            return resolve(payload as AccessToken);
        });
    });
}

export function refreshAccessToken(refresh_token: string): Promise<JwtTokens> {
    return new Promise((resolve, reject) => {
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET as string, (err, payload) => {
            if (err) return reject(new httpError.Unauthorized());

            const jwt_data = payload as RefreshToken
            jwt.sign({"userId": jwt_data.userId}, ACCESS_TOKEN_SECRET as string, {expiresIn: "1h"}, (error, access_token) => {
                if (error) return reject(new httpError.BadRequest());
                return resolve({
                    access_token: access_token as string
                });
            });
        });
    })
}