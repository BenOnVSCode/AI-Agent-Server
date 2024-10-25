import z from "zod";
import { t } from "../context";
import { updateCallStatus } from "../../utils/calls";
import { calculateDuration, filterUndefined } from "../../utils/helper";

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
			if(type === 'end-of-call-report'){
				console.log(input.message)
				await updateCallStatus(id, filterUndefined({statusId: 3, transcript:input.message.artifact?.transcript, recordingUrl: input.message.artifact?.recordingUrl, duration: input.message.durationSeconds, summary:input.message.analysis?.summary, success: input.message.analysis?.successEvaluation === "false" ? false : true  }))
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