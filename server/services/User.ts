import { User } from '../models/User'
import { ILoginUserArgs, IRegisterUserArgs, IUserDocument } from '../../types/User'
import bcrypt from 'bcryptjs'
import validateEmail from '../utils/validateEmail'
import validatePassword from '../utils/validatePassword'
import { UserActivationService } from './UserActivation'

const userActivationService = new UserActivationService()

export class UserService {
    async register (args: IRegisterUserArgs): Promise<IUserDocument> {
        try {
            const preparedUserData = await this.validateAndPrepareUserData(args)

            const createdUser = await User.create(preparedUserData)

            await userActivationService.create(createdUser)

            return createdUser
        } catch (err) {
            throw new Error(err)
        }
    }

    async loginByPassword (args: ILoginUserArgs): Promise<IUserDocument> {
        try {
            const {
                email,
                password
            } = args

            const user = await User.findOne({email})

            if (!user) throw new Error ('user not found')
            if (!(await bcrypt.compare(password, user.password))) throw new Error ('invalid password')

            return user
        } catch (err) {
            throw new Error(err)
        }
    }

    async validateAndPrepareUserData (args: IRegisterUserArgs) {
        const {
            email,
            password
        } = args

        await Promise.all([
            validateEmail(email),
            validatePassword(password)
        ])

        const lowercaseEmail = email.toLowerCase()

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return {
            ...args,
            email: lowercaseEmail,
            password: hashedPassword
        }
    }
}
