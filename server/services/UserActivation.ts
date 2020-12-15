
import { v4 as uuid } from 'uuid'
import nodemailer from 'nodemailer'
import config from 'config'
import { IUser } from '../../types/User'
import { IUserActivation, IUserActivationArgs } from '../../types/UserActivation'
import { UserActivation } from '../models/UserActivation'

export class UserActivationService {
  async findOne (args: IUserActivationArgs): Promise<IUserActivation | null> {
    try {
      return await UserActivation
        .findOne(args)
        .populate('user')
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (user: IUser): Promise<void> {
    try {
      const preparedActivation = this.prepareActivation(user._id)

      const createdActivation = await UserActivation.create(preparedActivation)

      await this.sendActivationEmail(user.email, createdActivation.activationCode)
    } catch (err) {
      throw new Error(err)
    }
  }

  prepareActivation (user: string) {
    const activationCode = uuid()

    return {
      user,
      activationCode
    }
  }

  async sendActivationEmail (userEmail: string, activationCode: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vanekvoj@gmail.com',
          pass: '3psi4psi@'
        }
      })

      const info = await transporter.sendMail({
        from: 'grady.terry60@ethereal.email', // sender address
        to: 'vanevo00@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
      })

      console.log(`Message sent: ${info.messageId}`)
    } catch (err) {
      console.log(err)
    }
  }
}
