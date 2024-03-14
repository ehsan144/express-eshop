import {compare, hash} from "bcrypt";
import httpError from "http-errors";

export class Auth {
    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            compare(password, hash, (err, is_verify) => {
                if (err) reject(new httpError.BadRequest())
                resolve(is_verify)
            })
        })
    }

    static async hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            hash(password, 10, (err, encrypted) => {
                if (err) reject(new httpError.BadRequest())
                resolve(encrypted)
            })
        })
    }
}
