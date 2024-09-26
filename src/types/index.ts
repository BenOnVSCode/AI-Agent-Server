export interface RequestBody {
	message: {
    phoneNumber: {
      number: string
    }
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
