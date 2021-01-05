import { Schema, model } from 'mongoose'
import { IUserDocument } from '../../types/User'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  activated: {
    type: Boolean,
    required: true,
    default: false
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
})

export const User = model<IUserDocument>('user', UserSchema)
