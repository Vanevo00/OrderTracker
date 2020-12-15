import { Document } from 'mongoose'
import { IUser } from './User'

export interface IUserActivation {
    _id?: any
    activationCode: string
    user: IUser
    created?: string
}

export interface IUserActivationDocument extends Document, IUserActivation {}

export interface IUserActivationArgs {
    activationCode: IUserActivation['activationCode']
}