import { v4 as uuid } from 'uuid'
import nodemailer from 'nodemailer'
import { IUser } from '../../types/User'
import { IUserActivation, IUserActivationArgs } from '../../types/UserActivation'
import { UserActivation } from '../models/UserActivation'
import config from 'config'
import { generateHtmlActivationEmail, generatePlainActivationEmail } from '../mailer/activationEmail'

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
        service: config.get('nodemailer.service'),
        auth: {
          user: config.get('nodemailer.user'),
          pass: config.get('nodemailer.pass')
        }
      })

      await transporter.sendMail({
        from: config.get('nodemailer.user'),
        to: userEmail,
        subject: 'Správce objednávek - aktivační kód',
        text: generatePlainActivationEmail(activationCode),
        html: generateHtmlActivationEmail(activationCode)
      })

      console.log(`Email with activation code sent to: ${userEmail}`)
    } catch (err) {
      console.log(err)
    }
  }
}
