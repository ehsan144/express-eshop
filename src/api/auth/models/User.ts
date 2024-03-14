import type {ProfileModel} from "./Profile";

export interface BaseUserModel {
    username: string;
    email: string;

}

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the auth
 *         username:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email address
 *         role:
 *           type: string
 *           description: User's email address
 *         membership:
 *           type: string
 *           description: User's email address
 *         profile:
 *           type: object
 *           description: User's email address
 */
export interface UserModel extends BaseUserModel {
    role: string;
    membership: string;
    profile: ProfileModel | null;

}

export interface RegisterUserModel extends BaseUserModel {
    password: string;
}
