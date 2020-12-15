import { Schema, model } from 'mongoose'
import { IUserActivationDocument } from '../../types/UserActivation'

const UserActivationSchema = new Schema({
  activationCode: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

export const UserActivation = model<IUserActivationDocument>('userActivation', UserActivationSchema)
