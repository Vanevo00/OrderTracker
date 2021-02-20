import { IOrderArgs, IOrderDocument } from '../../types/Order'
import { UserService } from './User'
import { Order } from '../models/Order'
import validator from 'validator'
import isEmpty from '../utils/isEmpty'
import { UserInputError } from 'apollo-server-express'
import { VALIDATION_ERROR } from '../../common/errorCodes'

const userService = new UserService()

export class OrderService {
  async create (args: IOrderArgs, userToken: string): Promise<IOrderDocument> {
    try {
      const user = userService.findUserByTokenOrFail(userToken)
      return Order.create({
        user,
        ...args
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async update (args: IOrderArgs, userToken: string): Promise<boolean> {
    const [userId, order] = await Promise.all([
      userService.findUserByTokenOrFail(userToken),
      Order.findById(args._id).populate('user')
    ])

    if (!order) throw new Error('order not found')
    if (typeof order.user === 'object' && userId !== order.user._id.toString()) throw new Error('unauthorised')
    this.validateOrder(args)
    await order.updateOne({
      ...args,
      updated: new Date().toISOString()
    })

    return true
  }

  async findByUser (userToken: string): Promise<IOrderDocument[]> {
    try {
      const userId = userService.findUserByTokenOrFail(userToken)
      return Order.find({ user: userId }).populate('user').populate('supplier')
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete (_id: string, userToken: string): Promise<boolean> {
    const [userId, order] = await Promise.all([
      userService.findUserByTokenOrFail(userToken),
      Order.findById(_id).populate('user')
    ])

    if (!order) throw new Error('order not found')

    if (typeof order.user === 'object' && userId !== order.user._id.toString()) throw new Error('unauthorised')
    await order.delete()
    return true
  }

  validateOrder (args: IOrderArgs) {
    const errors: {
      name?: string
      client?: string
      email?: string
      product?: string
      orderedOn?: string
      toBeReadyOn?: string
      smsSent?: string
      notes?: string
    } = {}

    if (validator.isEmpty(args.name, { ignore_whitespace: true })) errors.name = 'název objednávky musí být vyplněn'
    if (!validator.isLength(args.name, { max: 100 })) errors.name = 'název objednávky může mít max. 100 znaků'
    if (validator.isEmpty(args.client, { ignore_whitespace: true })) errors.client = 'jméno klienta musí být vyplněno'
    if (!validator.isLength(args.client, { max: 100 })) errors.client = 'jméno klienta může mít max. 100 znaků'
    if (typeof args.email !== 'undefined' && !validator.isEmail(args.email)) errors.email = 'nesprávný formát emailu'
    if (typeof args.product !== 'undefined' && !validator.isLength(args.product, { max: 200 })) errors.product = 'popis produktu může mít max. 200 znaků'
    if (typeof args.orderedOn !== 'undefined' && !validator.isLength(args.orderedOn, { max: 100 })) errors.orderedOn = 'termín objednávky může mít max. 100 znaků'
    if (typeof args.toBeReadyOn !== 'undefined' && !validator.isLength(args.toBeReadyOn, { max: 100 })) errors.toBeReadyOn = 'termín vydání může mít max. 100 znaků'
    if (typeof args.smsSent !== 'undefined' && !validator.isLength(args.smsSent, { max: 100 })) errors.smsSent = 'poznámka k sms může mít max. 100 znaků'
    if (typeof args.notes !== 'undefined' && !validator.isLength(args.notes, { max: 1000 })) errors.notes = 'poznámka může mít max. 1000 znaků'

    if (!isEmpty(errors)) {
      throw new UserInputError(VALIDATION_ERROR, {
        errors
      })
    }
  }
}
