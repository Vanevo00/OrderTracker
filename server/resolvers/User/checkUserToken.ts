import { UserService } from '../../services/User'
import { IContext } from '../../../types/Context'
import { IUserDocument } from '../../../types/User'

const userService = new UserService()

export default {
    Query: {
        checkUserToken: async (_: undefined, args: undefined, ctx: IContext): Promise<IUserDocument | boolean> => {
            const {
                req,
                res
            } = ctx

            return await userService.checkUserToken(req, res)
        }
    }
}
