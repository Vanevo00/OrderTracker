import { IFindOneUserArgs, IUserDocument } from '../../../types/User'
import { UserService } from '../../services/User'

const userService = new UserService()

export default {
    Query: {
        findOneUser: async (_: undefined, args: IFindOneUserArgs): Promise<IUserDocument> => await userService.findOne(args)
    }
}
