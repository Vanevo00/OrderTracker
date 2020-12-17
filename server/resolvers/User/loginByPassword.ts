import { ILoginUserArgs, IUserDocument } from '../../../types/User'
import { UserService } from '../../services/User'

const userService = new UserService()

export default {
    Mutation: {
        loginByPassword: async (_: undefined, args: ILoginUserArgs): Promise<IUserDocument> => await userService.loginByPassword(args)
    }
}
