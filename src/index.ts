import fastify from 'fastify';
import { FastifyRequest } from 'fastify'; // Ensure you import FastifyRequest
import { RequestBody } from './types';
import dotenv from 'dotenv'; 
import { sendEmail } from './services/email'; 
import { formatEmailHtml, transformData } from './services/transform';


dotenv.config(); 
const server = fastify();

// Declare a route
server.post('/costumer_service/vapi_webhook', async (request: FastifyRequest<{ Body: RequestBody }>, reply) => {
  try {
    const transformedData = transformData(request.body);
    const text = formatEmailHtml(transformedData);
    const emails = process.env.EMAILS || "";
    await sendEmail(emails.split(","), `Internal Report: ${transformedData.name || ""}`,  text);
    return { message: 'Email sent successfully' };
  } catch (error) {
    console.log(error)
    reply.status(500).send({ error: 'Failed to send email' });
  }
});

// Run the server!
server.listen({ port: 7000, host: '0.0.0.0' }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on port 7000`);
});
