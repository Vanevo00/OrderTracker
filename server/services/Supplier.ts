import { ISupplierArgs, ISupplierDocument } from '../../types/Supplier'
import { UserService } from './User'
import { Supplier } from '../models/Supplier'

const userService = new UserService()

export class SupplierService {
  async create (args: ISupplierArgs, userToken: string): Promise<ISupplierDocument> {
    try {
      const user = userService.findUserByTokenOrFail(userToken)
      await this.validateSupplier(args, user)
      return Supplier.create({
        user,
        ...args
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findByUser (userToken: string): Promise<ISupplierDocument[]> {
    try {
      const user = userService.findUserByTokenOrFail(userToken)
      return Supplier.find({ user }).populate('user')
    } catch (err) {
      throw new Error(err)
    }
  }

  async validateSupplier (args: ISupplierArgs, user: string) {
    const [duplicateName, duplicateAbbreviation] = await Promise.all([
      Supplier.findOne({
        name: args.name,
        user
      }),
      Supplier.findOne({
        abbreviation: args.abbreviation,
        user
      })
    ])

    if (duplicateName) throw new Error('duplicate name')
    if (duplicateAbbreviation) throw new Error('duplicate abbreviation')
  }
}
