// src/context.ts

import { initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const createContext = async ({ req }: CreateFastifyContextOptions) => {
  let user = null;

  // Check if the request has an authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!); // Decode the JWT token
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  return {
    req,
    user, // Include user info in the context
  };
};

export const t = initTRPC.context<typeof createContext>().create();
