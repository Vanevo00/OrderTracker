import { IRegisterUserArgs, IUserDocument } from '../../../types/User'
import { UserService } from '../../services/User'

const userService = new UserService()

export default {
  Mutation: {
    registerUser: async (_: undefined, args: IRegisterUserArgs): Promise<IUserDocument> => await userService.register(args)
  }
}
