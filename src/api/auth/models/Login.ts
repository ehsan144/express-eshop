export interface LoginUserModel {
    username: string;
    password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResult:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           description: access auth bearer token
 *         refresh_token:
 *           type: string
 *           description: refresh auth bearer token
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email address
 *         role:
 *           type: string
 *           description: User's Role
 */
export type LoginResultModel = {
    access_token?: string;
    refresh_token?: string;
    username?: string;
    email?: string;
    role?: string;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyResult:
 *       type: object
 *       properties:
 *         is_verified:
 *           type: boolean
 *           description: status of verify auth token
 *         username:
 *           type: string
 *           description: User's username
 *         email:
 *           type: string
 *           description: User's email address
 */
export type VerifyResultModel = {
    is_verified: boolean;
    username?: string;
    email?: string;

}
