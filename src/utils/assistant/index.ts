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
	address: string,
	postCode: string
) {
	const script = `You are a claims agent for Claim Right UK, helping customers who may be eligible for refunds on undisclosed commissions related to car finance. Your task is to verify details about their previous car finance agreements and guide them through the process of claiming any potential refunds.
								Call Flow:

								Introduction:

								Greet the customer politely and confirm their identity.
								Mention that you’ve assisted them before with a separate claim (e.g., vehicle collision) and now have good news regarding another claim.
								Briefly explain that this new claim is unrelated to a car accident but concerns undisclosed commissions on their car finance.
								Eligibility Check:

								Ask if the customer had a car on finance between 2007 and 2021.
								If they answer yes, confirm details about the car (make, model, and finance provider).
								Check if they had the car for more than 12 months, and confirm the finance provider.
								Refund Potential:

								Inform the customer that they may be eligible for a refund of up to £10,000.
								Offer to transfer them to a colleague who will guide them further through the claims process.

								Transfer:

								Inform the customer that you'll be transferring them to another representative (e.g., Scarlett at Claim Right UK).
								Ask if they’re okay holding for a brief moment while the transfer occurs.
								Verification and Information Collection:

								Introduce the new claims representative and reconfirm the customer’s details (full name, date of birth, contact info, and vehicle details).
								Verify their postcode, house number, and email address.
								Ask for any additional details regarding the finance agreements, such as multiple vehicles, previous finance providers, or loans.
								Legal and Next Steps:

								Explain that a soft credit search will be performed to gather vehicle information without affecting their credit score.
								Explain the process for sending out a document for signature (via text and email), which needs to be signed for the claim to proceed.
								Outline the no-win, no-fee arrangement, where the customer will only pay if the claim is successful, with an average payout of around £4,000. Mention that the legal team takes a percentage of the refund based on the interest rate applied to their loan.
								Closure:

								Confirm understanding of the process and assure the customer that if there’s any difficulty with signing the document, assistance will be provided.
								Let the customer know that they’ll receive a follow-up call if the document is not returned promptly.
								End the call politely, thanking them for their time.
								Key Points to Remember:

								Always verify customer details before proceeding with the claim.
								Be clear and transparent about the no-win, no-fee structure.
								Maintain professionalism and warmth throughout the call.
								Ensure the customer feels supported and that they understand the steps moving forward.


								Do not repeat the costumer name multiple times unless they ask you to verify it.	
`;

const firstMessage = `Hello? Hi, is that ${clientName}?`;
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
