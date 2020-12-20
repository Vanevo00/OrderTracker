import { UserService } from '../../services/User'
import { IContext } from '../../../types/Context'

const userService = new UserService()

export default {
    Mutation: {
        logout: async (_: undefined, args: undefined, ctx: IContext): Promise<boolean> => {
            const {
                res
            } = ctx

            return await userService.logout(res)
        }
    }
}
