import { merge } from 'lodash'
import registerUser from './User/registerUser'
import activateUser from './UserActivation/activateUser'
import loginByPassword from './User/loginByPassword'

export default merge(
    registerUser,
    activateUser,
    loginByPassword
)
