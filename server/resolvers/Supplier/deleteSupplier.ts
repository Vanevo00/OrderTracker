import { IContext } from '../../../types/Context'
import { SupplierService } from '../../services/Supplier'

const supplierService = new SupplierService()

export default {
  Mutation: {
    deleteSupplier: async (_: undefined, _id: string, ctx: IContext): Promise<boolean> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx
      return await supplierService.delete(_id, userToken)
    }
  }
}
