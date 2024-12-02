import { t } from './context'
import { loginUser, profile } from './procedures/auth'
import { getAllCalls } from './procedures/calls'
import { webhook } from './procedures/calls_webhook'
import { createBulkFinanceCarSaleCalls, createBulkSaleCalls, createFinanceCarSaleCall, createSaleCall } from './procedures/sales'
import { statuses } from './procedures/status'
import { createVerificationCall } from './procedures/verification'
import { createUser, deleteUser, getAllUsers, updateUser } from './procedures/users'



const appRouter = t.router({
  createVerificationCall,
  createUser,
  loginUser,
  profile,
  getAllCalls,
  statuses,
  webhook,
  createSaleCall,
  createBulkSaleCalls,
  getAllUsers,
  deleteUser,
  updateUser,
  createFinanceCarSaleCall,
  createBulkFinanceCarSaleCalls
})

export default appRouter