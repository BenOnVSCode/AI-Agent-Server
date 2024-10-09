import { t } from './context'
import { createUser, loginUser } from './procedures/auth'
import { createVerificationCall } from './procedures/verification'



const appRouter = t.router({
  createVerificationCall,
  createUser,
  loginUser
})

export default appRouter