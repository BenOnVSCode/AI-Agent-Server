import { z } from 'zod';
import { t } from '../context';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAdmin } from '../../auth/middleware'; // Adjust the import based on your structure
import { prisma } from '../../utils/prisma';



export const createUser = t.procedure
  .use(isAdmin) // Use the isAdmin middleware to protect this procedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['USER', 'ADMIN', 'SUPERVISOR']),
    }),
  )
  .mutation(async ({ input }) => {
    const { email, password, role } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    return { user };
  });

export const loginUser = t.procedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const { email, password } = input;
    console.log("XXX");
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { user, token };
  });

