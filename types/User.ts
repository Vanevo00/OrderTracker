import { Document } from 'mongoose'

export interface IUser {
    name: string
    email: string
    password: number
    updated?: string
    created?: string
}

export interface IUserDocument extends Document, IUser {}

export interface IRegisterUserArgs {
    name: IUser['name']
    email: IUser['email']
    password: IUser['password']
}
