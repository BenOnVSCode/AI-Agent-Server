import { Assistant } from "src/types";


export function createAssistant(script: string, firstMessage: string): Assistant {
	const assistant: Assistant = {
		transcriber: {
			model: "nova-2",
			language: "en",
			provider: "deepgram"
		},
		model: {
			model: "gpt-4o-mini", 
			messages: [
				{
					role: "system",
					content: script,
				}
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
		voicemailMessage: "Hey this is Mary from Mary's Dental. Please call back when you're available.",
		endCallMessage: "Bye",
		clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
		serverMessages: ["end-of-call-report", "hang", "status-update"],
		responseDelaySeconds: 0.2,
		serverUrl: "https://2a97-154-144-224-33.ngrok-free.app/api/trpc/webhook",
		endCallPhrases: ["goodbye"],
		analysisPlan: {
			summaryPrompt: "Beside the summary note these informations:\nName of the client, Post code, Address, POA, Phone number. \nPlease provide it in this format between quotes (make sure to split the lines with \\n):\n`\n----------------------------------\nName:  ${name} \\n\nPost Code: ${postcode} \\n\nClient Address: ${client address} \\n\nHas POA: (True or false) (If the client's finances are handled by someone even if only during emergencies set this one to True) , \\n\n----------------------------------\n`",
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
      backoffSeconds: 0
    }
	};

	return assistant;
}
