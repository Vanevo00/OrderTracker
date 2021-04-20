import { merge } from 'lodash'
import registerUser from './User/registerUser'
import activateUser from './UserActivation/activateUser'
import loginByPassword from './User/loginByPassword'
import findOneUser from './User/findOneUser'
import checkUserToken from './User/checkUserToken'
import logout from './User/logout'
import createSupplier from './Supplier/createSupplier'
import findSuppliersByUser from './Supplier/findSuppliersByUser'
import deleteSupplier from './Supplier/deleteSupplier'
import createOrder from './Order/createOrder'
import findOrdersByUser from './Order/findOrdersByUser'
import updateOrder from './Order/updateOrder'
import deleteOrder from './Order/deleteOrder'
import archiveOrder from './Order/archiveOrder'

export default merge(
  findOneUser,
  registerUser,
  activateUser,
  checkUserToken,
  loginByPassword,
  logout,
  createSupplier,
  deleteSupplier,
  findSuppliersByUser,
  createOrder,
  updateOrder,
  archiveOrder,
  deleteOrder,
  findOrdersByUser
)
