import { Schema, model } from 'mongoose'
import { ISupplierDocument } from '../../types/Supplier'

const SupplierSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  abbreviation: {
    type: String,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

export const Supplier = model<ISupplierDocument>('supplier', SupplierSchema)
