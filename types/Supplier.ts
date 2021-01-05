import { Document } from 'mongoose'
import { IUser } from './User'

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
