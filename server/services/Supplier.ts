import { ISupplierArgs, ISupplierDocument } from '../../types/Supplier'
import { UserService } from './User'
import { Supplier } from '../models/Supplier'

const userService = new UserService()

export class SupplierService {
  async create (args: ISupplierArgs, userToken: string): Promise<ISupplierDocument> {
    try {
      const user = userService.findUserByTokenOrFail(userToken)
      return Supplier.create({
        user,
        ...args
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}
