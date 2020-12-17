import { Document } from 'mongoose'
import { IUser, IUserDocument } from './User'

export interface IUserActivation {
    _id?: any
    activationCode: string
    user: IUserDocument
    created?: string
}

export interface IUserActivationDocument extends Document, IUserActivation {}

export interface IUserActivationArgs {
    activationCode: IUserActivation['activationCode']
}