import z from "zod";
import { t } from "../context";
import { updateCallStatus } from "../../utils/calls";
import { calculateDuration, filterUndefined } from "../../utils/helper";
import { transformData } from "../../services/transform";
import { prisma } from "src/utils/prisma";

export const webhook = t.procedure
	.input(
		z.object({
			message: z.object({
				durationSeconds: z.number().optional(),
				status: z.string().optional(),
				analysis: z.object({
					summary: z.string().optional(),
					successEvaluation: z.enum(['false', 'true']).optional()
				}).optional(),
				costumer: z.object({
					number: z.string().optional()
				}).optional(),
				artifact: z.object({
					transcript: z.string().optional(),
					recordingUrl: z.string().optional(),
					startedAt: z.string().optional(),
					endedAt: z.string().optional(),
				}).optional(),
				type: z.string(),
				call: z.object({
					id: z.string()
				})
			})
		})
	)
	.mutation(async ({ input, ctx }) => {
		try {
			const { type } = input.message;
			const { id } = input.message.call;
			console.log(input.message)
			console.log(input.message.status, input.message.type);
			if(type === 'end-of-call-report'){
				const clientInfo = transformData(input);
				/* await updateCallStatus(id, filterUndefined({statusId: 3, clientAddress: clientInfo.address, postCode: clientInfo.postCode, hasPoa: clientInfo.hasPOA , transcript:input.message.artifact?.transcript, recordingUrl: input.message.artifact?.recordingUrl, duration: input.message.durationSeconds, summary:input.message.analysis?.summary, success: input.message.analysis?.successEvaluation === "false" ? false : true  })) */
				await updateCallStatus(id, filterUndefined({statusId: 3, clientName: clientInfo.name, postCode: clientInfo.postCode, clientAddress: clientInfo.address, transcript:input.message.artifact?.transcript, recordingUrl: input.message.artifact?.recordingUrl, duration: input.message.durationSeconds, summary:input.message.analysis?.summary, success: input.message.analysis?.successEvaluation === "false" ? false : true }))
				
			}
			else if(type === "status-update"){
				if(input.message.status === "ended") {
					await updateCallStatus(id, {statusId: 4, success: false})
				}
			}
			return null;
		} catch (error) {
			console.log(error)
		}
  })

export const test = t.procedure
	.input(
		z.unknown()
	)
	.mutation(async ({input, ctx}) => {
		console.log(input)
	})