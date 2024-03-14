import {NextFunction} from "express";
import log from "./logger";

export async function HandleError(err: Error, req: Request, res: Response) {
    log.error(err.message)
}