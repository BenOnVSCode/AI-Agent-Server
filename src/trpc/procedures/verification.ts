import z from "zod";
import { t } from "../context";
import { v4 as uuid } from "uuid";
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
      initiatedBy: z.number(),
			postcode: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		try {
			const { name, id, number, address, split, price, bank, isDD, initiatedBy, postcode } = input;
			const VERIFICATION_NUMBER_ID = process.env.VERIFICATION_NUMBER_ID;
			// Validate input
			if (!name || !id || !number || !address || !price || !bank || isDD === undefined || split === undefined || !postcode) {
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

			const assistant = createVerificationAssistant(name, address, split, price, bank, isDD);
			const callResponse = await createCall(assistant, VERIFICATION_NUMBER_ID, number);
      const callType = await prisma.callType.findUnique({
        where: {
          id: 0
        },
      });
			const status = await prisma.status.findUnique({
				where: {
					id: 0
				}
			})
      if(!callType || !status) throw new Error('Call type verification does not exist')
			const call = await prisma.call.create({
				data: {
					clientName: name,
					callTypeId: callType.id,
					statusId: status.id,
					number,
					initiatedById: initiatedBy,
					reference: id,
					duration: 0,
					id: callResponse.id,
					postCode: postcode
				}
			})
      
			return call;

		} catch (error: any) {
			console.error('Error in createVerificationCall:', error.message);
			throw new Error(
				JSON.stringify({
					code: "CALL_CREATION_FAILED",
					message: error.message || "Failed to create verification call.",
				})
			);
		}
	});
