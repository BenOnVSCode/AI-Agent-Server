import z from "zod";
import { t } from "../context";

import { createVerificationAssistant } from "../../utils/assistant/verification";
import { createCall } from "../../services/createCall";
import { prisma } from "../../utils/prisma";

export const createVerificationCall = t.procedure
	.input(
		z.object({
			name: z.string(),
			address: z.string(),
			id: z.string(),
			number: z.string(),
			split: z.boolean(),
      price: z.number(),
      bank: z.string(),
      isDD: z.boolean(),
      initiatedBy: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		try {
			const { name, id, number, address, split, price, bank, isDD, initiatedBy } = input;
			const VERIFICATION_NUMBER_ID = process.env.VERIFICATION_NUMBER_ID;

			// Validate input
			if (!name || !id || !number || !address || !price || !bank || isDD === undefined || split === undefined) {
				throw new Error(
					JSON.stringify({
						code: "INVALID_INPUT",
						message: "Validation failed: All fields are required.",
					})
				);
			}

			if (!VERIFICATION_NUMBER_ID) {
				throw new Error(
					JSON.stringify({
						code: "NUMBER_ID_NOT_FOUND",
						message: "No number to call from.",
					})
				);
			}

			// Create the assistant object
			const assistant = createVerificationAssistant(name, address, split, price, bank, isDD);

			// Call the createCall function and get the response
			const callResponse = await createCall(assistant, VERIFICATION_NUMBER_ID, number);
      console.log(callResponse)
      const initiatedByID = initiatedBy === 'CRM' ? 0 : parseInt(initiatedBy);
      const callType = await prisma.callType.findUnique({
        where: {
          type: 'Verification', 
        },
      });
      if(!callType) throw new Error('Call type verification does not exist')
      await prisma.call.create({
        data: {
          id: callResponse.id,
          clientName: name,
          reference: id,
          duration: 0,
          status: 'Initiated',
          initiatedById: initiatedByID,
          reasonFailed: null,
          recordingUrl: null,
          callTypeId: callType.id
        }
      })
			// Return the response from createCall
			return callResponse;

		} catch (error: any) {
			// Log the error and return a structured error response
			console.error('Error in createVerificationCall:', error.message);
			throw new Error(
				JSON.stringify({
					code: "CALL_CREATION_FAILED",
					message: error.message || "Failed to create verification call.",
				})
			);
		}
	});
