
import formBodyPlugin from '@fastify/formbody'
import * as trpcFastify from '@trpc/server/adapters/fastify'
import Fastify from 'fastify';
import dotenv from 'dotenv'

import appRouter from './trpc/router';
import { createContext } from './trpc/context';

dotenv.config();

const app = Fastify({ logger: true });
app.register(formBodyPlugin);

// Register the tRPC plugin with Fastify
app.register(trpcFastify.fastifyTRPCPlugin, {
  prefix: '/api/trpc',
	trpcOptions: {
		router: appRouter,
    createContext
	}
})


export default app;