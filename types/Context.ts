import { Request, Response } from '../server/node_modules/@types/express'

export interface IContext {
    req: Request
    res: Response
}