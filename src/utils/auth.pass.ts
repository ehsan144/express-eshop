import {compare, hash} from "bcrypt";
import httpError from 'http-errors';

export async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        hash(password, 10, (err, encrypted) => {
            if (err) reject(new httpError.BadRequest())
            resolve(encrypted)
        })
    })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        compare(password, hash, (err, same) => {
            if (err) reject(new httpError.BadRequest())
            resolve(same)
        })
    })
}