import { IFindSupplierByUserArgs, ISupplierDocument } from '../../../types/Supplier'
import { IContext } from '../../../types/Context'
import { SupplierService } from '../../services/Supplier'

const supplierService = new SupplierService()

export default {
  Query: {
    findSuppliersByUser: async (_: undefined, args: IFindSupplierByUserArgs, ctx: IContext): Promise<ISupplierDocument[]> => {
      const {
        req: {
          cookies: {
            userToken
          }
        }
      } = ctx

      const {
        sorting
      } = args
      return await supplierService.findByUser(userToken, sorting)
    }
  }
}
