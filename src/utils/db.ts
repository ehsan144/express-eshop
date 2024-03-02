import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
    
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    db = global.__db;
}

export default db;

