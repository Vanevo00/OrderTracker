import { User } from '../models/User'
import {
  IFindOneUserArgs,
  ILoginUserArgs,
  IRegisterUserArgs,
  IUserDocument
} from '../../types/User'
import bcrypt from 'bcryptjs'
import validateEmail from '../utils/validateEmail'
import validatePassword from '../utils/validatePassword'
import { UserActivationService } from './UserActivation'
import jwt from 'jsonwebtoken'
import config from 'config'
import { Response, Request } from 'express'
import validateDuplicate from '../utils/validateDuplicate'

const userActivationService = new UserActivationService()

export class UserService {
  async findOne (args: IFindOneUserArgs): Promise<IUserDocument> {
    const user = await User.findOne(args)
    if (!user) throw new Error('user not found')
    return user
  }

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

  async loginByPassword (args: ILoginUserArgs, res: Response): Promise<IUserDocument> {
    try {
      const {
        email,
        password
      } = args

      const user = await User.findOne({ email: email.toLowerCase() })

      if (!user) throw new Error('user not found')
      if (!(await bcrypt.compare(password, user.password))) throw new Error('invalid password')
      if (!user.activated) throw new Error('user not activated')

      const userToken = jwt.sign(user.toJSON(), config.get('jwt.secret'), { expiresIn: '7 days' })
      res.cookie('userToken', userToken, {
        httpOnly: true
      })

      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async logout (res: Response): Promise<boolean> {
    res.clearCookie('userToken')
    return true
  }

  async checkUserToken (req: Request, res: Response): Promise<IUserDocument | boolean> {
    try {
      const user: any = jwt.verify(req.cookies.userToken, config.get('jwt.secret'))
      return user
    } catch (err) {
      res.clearCookie('userToken')
      return false
    }
  }

  findUserByTokenOrFail (token: string): string {
    if (!token) throw new Error('user token not provided')
    const user: any = jwt.verify(token, config.get('jwt.secret'))
    return user._id
  }

  async validateAndPrepareUserData (args: IRegisterUserArgs) {
    const {
      name,
      email,
      password
    } = args

    await Promise.all([
      validateDuplicate({ name }),
      validateDuplicate({ email }),
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
