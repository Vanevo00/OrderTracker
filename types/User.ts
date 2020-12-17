import { Document } from 'mongoose'

export interface IUser {
    _id?: any
    name: string
    email: string
    password: string
    activated?: boolean
    updated?: string
    created?: string
}

export interface IUserDocument extends Document, IUser {}

export interface IRegisterUserArgs {
    name: IUser['name']
    email: IUser['email']
    password: IUser['password']
}

export interface ILoginUserArgs {
    email: IUser['email']
    password: IUser['password']
}
