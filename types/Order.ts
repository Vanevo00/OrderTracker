import { Document } from 'mongoose'
import { IUser } from './User'
import { ISupplier } from './Supplier'

export interface IOrder {
  _id?: any
  user: IUser | string
  supplier: ISupplier | string
  name?: string
  client: string
  phone?: string
  email?: string
  product?: string
  notes?: string
  smsSent?: boolean
  pickedUp?: boolean
  toBeReadyOn?: string
  orderedOn?: string
  updated?: string
  created?: string
}

export interface IOrderDocument extends Document, IOrder {}

export interface IOrderArgs {
  _id?: any
  supplier: IOrder['supplier']
  name?: IOrder['name']
  client: IOrder['client']
  phone?: IOrder['phone']
  email?: IOrder['email']
  product?: IOrder['product']
  notes?: IOrder['notes']
  smsSent?: IOrder['smsSent']
  pickedUp?: IOrder['pickedUp']
  toBeReadyOn?: IOrder['toBeReadyOn']
  orderedOn?: IOrder['orderedOn']
}
