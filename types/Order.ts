import { Document } from 'mongoose'
import { IUser } from './User'
import { ISupplier } from './Supplier'
import { ISorting } from './Sorting'

export interface IOrder {
  _id?: any
  user: IUser | string
  supplier?: ISupplier | string
  name?: string
  client?: string
  phone?: string
  email?: string
  product?: string
  notes?: string
  smsSent?: string
  pickedUp?: boolean
  toBeReadyOn?: string
  orderedOn?: string
  updated?: string
  created?: string
  isBeingCreated?: boolean
}

export interface IOrderPopulated extends IOrder {
  user: IUser
  supplier: ISupplier
}

export interface IOrderDocument extends Document, IOrder {}

export interface IFindOrdersByUserArgs {
  sorting?: ISorting
}

export interface IOrderArgs {
  _id?: any
  supplier?: IOrder['supplier']
  name?: IOrder['name']
  client?: IOrder['client']
  phone?: IOrder['phone']
  email?: IOrder['email']
  product?: IOrder['product']
  notes?: IOrder['notes']
  smsSent?: IOrder['smsSent']
  pickedUp?: IOrder['pickedUp']
  toBeReadyOn?: IOrder['toBeReadyOn']
  orderedOn?: IOrder['orderedOn']
}
