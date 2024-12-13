import { Assistant } from "src/types";

export function createAssistant(
	script: string,
	firstMessage: string
): Assistant {
	const assistant: Assistant = {
		transcriber: {
			model: "nova-2",
			language: "en",
			provider: "deepgram",
		},
		model: {
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: script,
				},
			],
			provider: "openai",
			temperature: 0.1,
		},
		voice: {
			model: "eleven_turbo_v2",
			style: 0,
			voiceId: "FgRSXooyFqEls07I01Rt",
			provider: "11labs",
			stability: 0.4,
			similarityBoost: 0.5,
		},
		recordingEnabled: true,
		firstMessage: firstMessage,
		voicemailMessage:
			"Hey this is Mary from Mary's Dental. Please call back when you're available.",
		endCallMessage: "Bye",
		clientMessages: [
			"transcript",
			"hang",
			"function-call",
			"speech-update",
			"metadata",
			"conversation-update",
		],
		serverMessages: ["end-of-call-report", "hang", "status-update"],
		responseDelaySeconds: 0.2,
		serverUrl: `${process.env.SERVER_URL}/api/trpc/webhook`,
		endCallPhrases: ["goodbye"],
		analysisPlan: {
			summaryPrompt:
				"Beside the summary note these informations:\nName of the client, Post code, Address, POA, Phone number. \nPlease provide it in this format between quotes (make sure to split the lines with \\n):\n`\n----------------------------------\nName:  ${name} \\n\nPost Code: ${postcode} \\n\nClient Address: ${client address} \\n\nHas POA: (True or false) (If the client's finances are handled by someone even if only during emergencies set this one to True) , \\n\n----------------------------------\n`",
		},
		backgroundDenoisingEnabled: true,
		messagePlan: {
			idleMessages: ["Are you still there?"],
		},
		startSpeakingPlan: {
			waitSeconds: 0,
			smartEndpointingEnabled: true,
		},
		stopSpeakingPlan: {
			voiceSeconds: 0.1,
			backoffSeconds: 0,
		},
	};

	return assistant;
}

export function createFinanceSaleAssistant(
	clientName: string,
) {
	const script = `Please make sure to finish the questions before transfer
Please do not transfer unless the client is eligible and answered all the questions
Please forward the call only after finishing the questions. after finishing the questions say this: "I'll just need to pop you over quickly to my colleague at Claim Right UK. They will just run through a few details with you, and then they'll get your refund process started, can you hold the line for just a sec please?" and then direct the call using the transfer call function to ${process.env.FORWARDED_TO_NUMBER || "+212772133563"}.


You are a claims agent for Claim Right UK, helping customers who may be eligible for refunds on undisclosed commissions related to car finance. Your task is to verify details about their previous car finance agreements and guide them through the process of claiming any potential refunds.

Call Flow (please follow the call flow precisely), these are questions you ask the client and wait for the answer in case of no answer ask again please:

Introduce yourself: 
It's Jane from Auto Protect. I understand you may have had a vehicle on finance a while ago. So, I may have some good news for you. You may be eligible for a payout, regarding the hidden commissions scandal. 
So, we're currently working with Claim Right UK, who are running claims for hidden commissions on car finance. 

Can I just confirm (confirm each question from below): 

Questions: 

- Have you had a car on finance between 2007 and January 28th 2021? 

- Okay, great. And do you remember who the lenders were by any chance? 

- And is it just the one car you had on finance... or have you had a few? (in case they don't just procced to next question and say no problem)

- Perfect, and of course, I take it you had the vehicle for more than 12 months? 

- Lovely, just to check, do you recall the year when you started the agreement? 

- And lastly, can you kindly confirm you haven’t started the process of claiming for your refund with anyone else? 

- Okay, that's fine. No problem. So based on that, you may be eligible for a refund of up to ten thousands pounds.`;

const firstMessage = `Hello? Hi, is that ${clientName}?`;
const assistant: Assistant = {
	transcriber: {
		model: "nova-2",
		language: "en",
		provider: "deepgram",
	},
	model: {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: script,
			},
		],
		provider: "openai",
		temperature: 0,
		tools: [
			{
				type: "transferCall",
				destinations: [
					{
						type: "number",
						number: process.env.FORWARDED_TO_NUMBER || "+212772133563",
						message: "Im transfering the call"
					}
				],
				function: {
					name: "transferCall",
					description: "transfer-call",
					parameters: {
						type: "object",
						properties: {
							destination: {
								type: "string",
								enum: [
									process.env.FORWARDED_TO_NUMBER || "+212772133563"
								],
								"description": "The destination to transfer the call to."
							}
						},
						required: ["destination"]
					}
				},
				messages: [
					{
						type: "request-start",
						content: "I’m going to transfer you to my supervisor now, who will be able to assist you further. Please hold the line for a moment.",
						conditions: [
							{
								param: "destination",
              	operator: "eq",
								value: process.env.FORWARDED_TO_NUMBER || "+212772133563"
							}
						]
					}
				]
			}
		]
	},
	voice: {
		model: "eleven_turbo_v2",
		style: 0,
		voiceId: "FgRSXooyFqEls07I01Rt",
		provider: "11labs",
		stability: 0.4,
		similarityBoost: 0.5,
		fillerInjectionEnabled: true,
	},
	recordingEnabled: true,
	firstMessage: firstMessage,
	endCallMessage: "Bye",
	silenceTimeoutSeconds: 30,
	clientMessages: [
		"transcript",
		"hang",
		"function-call",
		"speech-update",
		"metadata",
		"conversation-update",
	],
	serverMessages: ["end-of-call-report", "hang", "status-update"],
	responseDelaySeconds: 0.2,
	serverUrl: `${process.env.SERVER_URL}/api/trpc/webhook`,
	endCallPhrases: ["goodbye"],
	analysisPlan: {
		summaryPrompt:
			"Beside the summary note these informations:\nName of the client, Post code, Address, POA, Phone number. \nPlease provide it in this format between quotes (make sure to split the lines with \\n):\n`\n----------------------------------\nName:  ${name} \\n\nPost Code: ${postcode} \\n\nClient Address: ${client address} \\n\nHas POA: (True or false) (If the client's finances are handled by someone even if only during emergencies set this one to True) , \\n\n----------------------------------\n`",
	},
	backgroundDenoisingEnabled: true,
	messagePlan: {
		idleMessages: ["Are you still there?"],
	},
	startSpeakingPlan: {
		waitSeconds: 0,
		smartEndpointingEnabled: true,
	},
	stopSpeakingPlan: {
		voiceSeconds: 0.1,
		backoffSeconds: 0,
		numWords: 2
	},
};

return assistant;
}
