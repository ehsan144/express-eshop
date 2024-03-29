import logger from "pino";
import httpError from 'http-errors';
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {AccessToken, JwtTokens, RefreshToken} from "./model";

dotenv.config();


const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    level: process.env.LOG_LEVEL || 'info',
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format('HH:mm:ss')}"`
});

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
if (!REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_SECRET) {
    log.error("secret key isn't set");
    process.exit(1);
}

export class Jwt {
    static async createAccessToken(userId: number): Promise<JwtTokens> {
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

    static async verifyAccessToken(token: string): Promise<AccessToken> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, ACCESS_TOKEN_SECRET as string, (err, payload) => {
                if (err) {
                    return reject(new httpError.Unauthorized());
                }
                return resolve(payload as AccessToken);
            });
        });
    }

    static async refreshAccessToken(refresh_token: string): Promise<JwtTokens> {
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
}

