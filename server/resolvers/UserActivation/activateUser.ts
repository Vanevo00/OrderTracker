import { IUserDocument } from '../../../types/User'
import { UserActivationService } from '../../services/UserActivation'
import { IUserActivationArgs } from '../../../types/UserActivation'

const userActivationService = new UserActivationService()

export default {
    Mutation: {
        activateUser: async (_: undefined, args: IUserActivationArgs): Promise<IUserDocument> => await userActivationService.activate(args)
    }
}
