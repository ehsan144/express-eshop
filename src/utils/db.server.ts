import {PrismaClient} from "@prisma/client";

let db : PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}
if (!global.__db) {
    global.__db = new PrismaClient();
}
if (process.env.NODE_ENV !== "production") {

}
db = global.__db

export {db};