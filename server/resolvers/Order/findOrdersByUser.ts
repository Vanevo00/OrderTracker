import { IFindOrdersByUserArgs, IOrderDocument } from '../../../types/Order'
import { IContext } from '../../../types/Context'
import { OrderService } from '../../services/Order'

const orderService = new OrderService()

export default {
  Query: {
    findOrdersByUser: async (_: undefined, args: IFindOrdersByUserArgs, ctx: IContext): Promise<IOrderDocument[]> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx

      const {
        sorting,
        filters
      } = args

      return await orderService.findByUser(userToken, sorting, filters)
    }
  }
}
