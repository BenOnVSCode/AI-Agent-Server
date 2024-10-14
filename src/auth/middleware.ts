import { TRPCError } from '@trpc/server';
import { t } from '../trpc/context';


export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource.',
    });
  }
  return next();
});


export const isAdmin = t.middleware(async ({ ctx, next }) => {
  // Type guard to check if ctx.user is JwtPayload
  if (!ctx.user || typeof ctx.user === 'string' || ctx.user.role !== 'ADMIN') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be an admin to perform this action.',
    });
  }
  return next();
});
