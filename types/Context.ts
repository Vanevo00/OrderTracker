import { Request, Response } from '../node_modules/@types/express'

export interface IContext {
    req: Request
    res: Response
}
