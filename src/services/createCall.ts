import axios from 'axios';
import dotenv from "dotenv"
import { Assistant } from 'src/types';

dotenv.config();


const options = {
  headers: {
    Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    'Content-Type': 'application/json',
  },
};


export async function createCall(assistant: Assistant, numberId: string, costumerNumber: string) {
  try {
    const data = {
      name: "name",
      assistant,
      phoneNumberId: numberId,
      customer: {
        number: costumerNumber
      }
    };
    const response = await axios.post('https://api.vapi.ai/call', data, options);
    return response.data;
  } catch (error: any) {
    console.error('Error creating call:', error.response.data);
    throw error; // Re-throw the error for further handling if needed
  }
}
