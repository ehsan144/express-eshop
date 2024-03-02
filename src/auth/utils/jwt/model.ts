import type {JwtPayload} from "jsonwebtoken";

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshResult:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           description: new access_token
 */

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