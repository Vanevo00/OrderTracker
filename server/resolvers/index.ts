import { merge } from 'lodash'
import registerUser from './User/registerUser'
import activateUser from './UserActivation/activateUser'

export default merge(
    registerUser,
    activateUser
)
