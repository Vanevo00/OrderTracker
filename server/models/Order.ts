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
    ref: 'supplier',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
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
    type: Boolean
  },
  pickedUp: {
    type: Boolean
  },
  toBeReadyOn: {
    type: Date
  },
  orderedOn: {
    type: Date
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
