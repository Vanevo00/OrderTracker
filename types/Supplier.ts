import { Document } from 'mongoose'
import { IUser } from './User'
import { ISorting } from './Sorting'

export interface ISupplier {
  _id?: any
  user: IUser | string
  name: string
  abbreviation?: string
}

export interface ISupplierDocument extends Document, ISupplier {}

export interface ISupplierArgs {
  name: ISupplier['name']
  abbreviation: ISupplier['abbreviation']
}

export interface IFindSupplierByUserArgs {
  sorting?: ISorting
}
