import { Schema, model } from 'mongoose'
import { IOrderDocument } from '../../types/Order'

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  },
  name: {
    type: String
  },
  client: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  product: {
    type: String
  },
  notes: {
    type: String
  },
  smsSent: {
    type: String
  },
  pickedUp: {
    type: Boolean
  },
  toBeReadyOn: {
    type: String
  },
  orderedOn: {
    type: String
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
})

export const Order = model<IOrderDocument>('order', OrderSchema)
