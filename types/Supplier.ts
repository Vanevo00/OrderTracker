import { Document } from 'mongoose'
import { IUser, IUserDocument } from './User'

export interface ISupplier {
  _id?: any
  user: string
  name: string
  abbreviation?: string
}

export interface ISupplierDocument extends Document, ISupplier {}

export interface ISupplierArgs {
  name: ISupplier['name']
  abbreviation: ISupplier['abbreviation']
}
