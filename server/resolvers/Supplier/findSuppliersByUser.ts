import { ISupplierDocument } from '../../../types/Supplier'
import { IContext } from '../../../types/Context'
import { SupplierService } from '../../services/Supplier'

const supplierService = new SupplierService()

export default {
  Query: {
    findSuppliersByUser: async (_: undefined, args: undefined, ctx: IContext): Promise<ISupplierDocument[]> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx
      return await supplierService.findByUser(userToken)
    }
  }
}
