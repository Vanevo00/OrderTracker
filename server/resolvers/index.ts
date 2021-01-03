import { merge } from 'lodash'
import registerUser from './User/registerUser'
import activateUser from './UserActivation/activateUser'
import loginByPassword from './User/loginByPassword'
import findOneUser from './User/findOneUser'
import checkUserToken from './User/checkUserToken'
import logout from './User/logout'
import createSupplier from './Supplier/createSupplier'
import findSuppliersByUser from './Supplier/findSuppliersByUser'

export default merge(
  findOneUser,
  registerUser,
  activateUser,
  checkUserToken,
  loginByPassword,
  logout,
  createSupplier,
  findSuppliersByUser
)
