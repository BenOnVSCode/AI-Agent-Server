import { t } from './context'
import { createUser, loginUser, profile } from './procedures/auth'
import { getAllCalls } from './procedures/calls'
import { test, webhook } from './procedures/calls_webhook'
import { statuses } from './procedures/status'
import { createVerificationCall } from './procedures/verification'



const appRouter = t.router({
  createVerificationCall,
  createUser,
  loginUser,
  profile,
  getAllCalls,
  statuses,
  webhook,
  test
})

export default appRouter