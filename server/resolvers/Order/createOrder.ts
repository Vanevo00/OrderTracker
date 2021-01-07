import { IOrderArgs, IOrderDocument } from '../../../types/Order'
import { IContext } from '../../../types/Context'
import { OrderService } from '../../services/Order'

const orderService = new OrderService()

export default {
  Mutation: {
    createOrder: async (_: undefined, args: IOrderArgs, ctx: IContext): Promise<IOrderDocument> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx
      return await orderService.create(args, userToken)
    }
  }
}
