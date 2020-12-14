import { User } from '../models/User'
import { IRegisterUserArgs, IUserDocument } from '../../types/User'

export class UserService {
    async register (args: IRegisterUserArgs): Promise<IUserDocument> {
        try {
            return await User.create(args)
        } catch (err) {
            throw new Error(err)
        }
    }
}
