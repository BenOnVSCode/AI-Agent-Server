export interface RequestBody {
	message: {
		phoneNumber: {
			number: string;
		};
		analysis: {
			summary: string;
		};
		artifact: {
			recordingUrl: string;
		};
		customer: {
			number: string;
		};
	};
}
type Analysis = {
	summary: string;
};

type PhoneNumber = {
	number: string;
};

type Artifact = {
	recordingUrl: string;
};

export type EmailData = {
	summary: string;
	number: string;
	address: string;
	postCode: string;
	recording: string;
	hasPOA: boolean;
};

export interface Assistant {
	id?: string;
	orgId?: string;
	name?: string;
	transcriber: {
		model: string;
		language: string;
		provider: string;
	};
	model: {
		model: string;
		messages: [
			{
				role: string;
				content: string;
			}
		];
		provider: string;
		temperature: number;
	};
	voice: {
		model: string;
		provider: string;
		style: number;
		voiceId: string;
		stability: number;
		similarityBoost: number;
	};
	recordingEnabled: boolean;
	firstMessage: string;
	voicemailMessage: string;
	endCallMessage: string;
	clientMessages: string[];
	serverMessages: string[];
	responseDelaySeconds: number;
	serverUrl: string;
	endCallPhrases: string[];
	analysisPlan: {
		summaryPrompt: string;
	};
	backgroundDenoisingEnabled: boolean;
	messagePlan: {
		idleMessages: string[];
	};
	startSpeakingPlan: {
		smartEndpointingEnabled: boolean;
		waitSeconds: number
	};
	stopSpeakingPlan: {
		voiceSeconds: number;
		backoffSeconds: number;
	}
}
