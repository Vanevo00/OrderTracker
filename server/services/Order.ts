import { IOrderArgs, IOrderDocument } from '../../types/Order'
import { UserService } from './User'
import { Order } from '../models/Order'

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

  async update (args: IOrderArgs, userToken: string): Promise<IOrderDocument> {
    try {
      const [userId, order] = await Promise.all([
        userService.findUserByTokenOrFail(userToken),
        Order.findById(args._id).populate('user')
      ])

      if (!order) throw new Error('order not found')
      if (typeof order.user === 'object' && userId !== order.user._id.toString()) throw new Error('unauthorised')
      return order.update(args)
    } catch (err) {
      throw new Error(err)
    }
  }

  async findByUser (userToken: string): Promise<IOrderDocument[]> {
    try {
      const userId = userService.findUserByTokenOrFail(userToken)
      return Order.find({ user: userId }).populate('user')
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
}
