import { z } from 'zod';
import { t } from '../context';

import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { isAdmin, isAuthenticated } from '../../auth/middleware'; // Adjust the import based on your structure
import { prisma } from '../../utils/prisma';
import { createActivity } from '../../utils/logs';




export const loginUser = t.procedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
      where: { email, isDeleted: false },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    createActivity(user.id, `${user.name} logged in`);
    return { token };
  });

export const profile = t.procedure
  .use(isAuthenticated)
  .query(async ({ ctx }) => {
    const { user } = ctx;
    const userId = (user as JwtPayload).id; 
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        role: true,
        id: true
      },
    });
    if (!userProfile) {
      throw new Error("User not found");
    }
    return {
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
      id: userProfile.id
    };
  });