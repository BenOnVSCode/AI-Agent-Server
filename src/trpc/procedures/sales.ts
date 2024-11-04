import z from "zod";
import { t } from "../context";
import { isAuthenticated } from "../../auth/middleware";
import { createSalesAssistant } from "../../utils/assistant/sales";
import { createCall } from "../../services/createCall";
import { prisma } from "../../utils/prisma";
import { v4 as uuid } from "uuid";
export const createSaleCall = t.procedure
	.use(isAuthenticated)
	.input(
		z.object({
			name: z.string(),
			address: z.string(),
			postCode: z.string(),
			number: z.string(),
			userId: z.number(),
		})
	)
	.mutation(async ({ ctx, input }) => {
		try {
			const { name, address, postCode, number, userId } = input;
			const SALES_NUMBER_ID = process.env.SALES_NUMBER_ID;
			if (!SALES_NUMBER_ID)
				throw new Error("No number id was provided in the env file");
			const assistant = createSalesAssistant(name, address, postCode);
			const call = await createCall(assistant, SALES_NUMBER_ID, number);
			await prisma.call.create({
				data: {
					id: call.id,
					callTypeId: 1,
					statusId: 0,
					clientName: name,
					clientAddress: address,
					postCode: postCode,
					number: number,
					initiatedById: userId,
					reference: uuid(),
					duration: 0,
				},
			});
			return call;
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	});

export const createBulkSaleCalls = t.procedure
	.use(isAuthenticated)
	.input(
		z.object({
			calls: z.array(
				z.object({
					name: z.string(),
					address: z.string(),
					number: z.string(),
					postCode: z.string(),
				})
			),
			initiatedBy: z.number(),
		})
	)
	.mutation(async ({ ctx, input }) => {
		try {
			const { calls, initiatedBy } = input;
			const SALES_NUMBER_ID = process.env.SALES_NUMBER_ID;

			if (!SALES_NUMBER_ID) {
				throw new Error("No number id was provided in the env file");
			}

			calls.forEach(async (call) => {
				const assistant = createSalesAssistant(
					call.name,
					call.address,
					call.postCode
				);
				const createdCall = await createCall(
					assistant,
					SALES_NUMBER_ID,
					call.number
				);
				await prisma.call.create({
					data: {
						id: createdCall.id,
						callTypeId: 1,
						statusId: 0,
						clientName: call.name,
						clientAddress: call.address,
						postCode: call.postCode,
						number: call.number,
						initiatedById: initiatedBy,
						reference: uuid(),
						duration: 0,
					},
				});
			});

			return {
				message: "Calls are being processed successfully.",
				totalCalls: calls.length,
			};
		} catch (error) {
			console.log(error);
			throw new Error("Something went wrong");
		}
	});
