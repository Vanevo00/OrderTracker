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

  async delete (_id: string, userToken: string): Promise<boolean> {
    const [userId, supplier] = await Promise.all([
      userService.findUserByTokenOrFail(userToken),
      Supplier.findById(_id).populate('user')
    ])

    if (!supplier) throw new Error('supplier not found')
    // @ts-ignore
    if (userId !== supplier.user._id.toString()) throw new Error('unauthorised')
    await Supplier.findByIdAndDelete(_id)
    return true
  }
}
