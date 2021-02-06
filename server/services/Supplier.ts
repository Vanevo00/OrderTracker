import { ISupplierArgs, ISupplierDocument } from '../../types/Supplier'
import { UserService } from './User'
import { Supplier } from '../models/Supplier'
import { DefaultSorting, ISorting } from '../../types/Sorting'
import prepareSortingObject from '../utils/prepareSortingObject'
import validator from 'validator'
import isEmpty from '../utils/isEmpty'
import { UserInputError } from 'apollo-server-express'

const userService = new UserService()

export class SupplierService {
  async create (args: ISupplierArgs, userToken: string): Promise<ISupplierDocument> {
    const user = userService.findUserByTokenOrFail(userToken)
    await this.validateSupplier(args, user)
    return Supplier.create({
      user,
      ...args
    })
  }

  async findByUser (
    userToken: string,
    sorting: ISorting = DefaultSorting
  ): Promise<ISupplierDocument[]> {
    try {
      const user = userService.findUserByTokenOrFail(userToken)
      return Supplier
        .find({ user })
        .collation({ locale: 'en' }) // necessary for case insensitive sorting
        .sort(prepareSortingObject(sorting))
        .populate('user')
    } catch (err) {
      throw new Error(err)
    }
  }

  async validateSupplier (args: ISupplierArgs, user: string) {
    const errors: {
      name?: string
      abbreviation?: string
    } = {}
    const [duplicitName, duplicitAbbreviation] = await Promise.all([
      Supplier.findOne({
        name: args.name,
        user
      }),
      Supplier.findOne({
        abbreviation: args.abbreviation,
        user
      })
    ])

    if (duplicitName) errors.name = 'duplicit'
    if (duplicitAbbreviation) errors.abbreviation = 'duplicit'
    if (!validator.isLength(args.name, { min: 1, max: 20 })) errors.name = 'must be between 1 and 20 characters'
    if (args.abbreviation && !validator.isLength(args.abbreviation, { max: 3 })) errors.abbreviation = 'must be max 3 characters'

    if (!isEmpty(errors)) {
      throw new UserInputError('Validation error', {
        errors
      })
    }
  }

  async delete (_id: string, userToken: string): Promise<boolean> {
    const [userId, supplier] = await Promise.all([
      userService.findUserByTokenOrFail(userToken),
      Supplier.findById(_id).populate('user')
    ])

    if (!supplier) throw new Error('supplier not found')

    if (typeof supplier.user === 'object' && userId !== supplier.user._id.toString()) throw new Error('unauthorised')
    await supplier.delete()
    return true
  }
}
