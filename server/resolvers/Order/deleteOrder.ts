import { IContext } from '../../../types/Context'
import { OrderService } from '../../services/Order'

const orderService = new OrderService()

export default {
  Mutation: {
    deleteOrder: async (_: undefined, _id: string, ctx: IContext): Promise<boolean> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx
      return await orderService.delete(_id, userToken)
    }
  }
}
