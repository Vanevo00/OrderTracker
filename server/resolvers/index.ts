import { merge } from 'lodash'
import registerUser from './User/registerUser'
import activateUser from './UserActivation/activateUser'
import loginByPassword from './User/loginByPassword'
import findOneUser from './User/findOneUser'

export default merge(
    findOneUser,
    registerUser,
    activateUser,
    loginByPassword
)
