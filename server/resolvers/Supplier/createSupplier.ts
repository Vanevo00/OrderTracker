import { ISupplierArgs, ISupplierDocument } from '../../../types/Supplier'
import { IContext } from '../../../types/Context'
import { SupplierService } from '../../services/Supplier'

const supplierService = new SupplierService()

export default {
  Mutation: {
    createSupplier: async (_: undefined, args: ISupplierArgs, ctx: IContext): Promise<ISupplierDocument> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx
      return await supplierService.create(args, userToken)
    }
  }
}
