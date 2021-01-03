import { Schema, model } from 'mongoose'
import { ISupplierDocument } from '../../types/Supplier'

const SupplierSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

export const Supplier = model<ISupplierDocument>('supplier', SupplierSchema)
