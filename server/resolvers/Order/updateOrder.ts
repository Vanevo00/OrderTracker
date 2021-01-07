import { IOrderArgs, IOrderDocument } from '../../../types/Order'
import { IContext } from '../../../types/Context'
import { OrderService } from '../../services/Order'

const orderService = new OrderService()

export default {
  Mutation: {
    updateOrder: async (_: undefined, args: IOrderArgs, ctx: IContext): Promise<boolean> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx
      return await orderService.update(args, userToken)
    }
  }
}
