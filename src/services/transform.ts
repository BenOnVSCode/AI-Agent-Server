// ... existing imports and code ...

import { RequestBody } from "../types";

export function transformData(response: RequestBody): {
	summary: string;
	name?: string; // Optional, as it's not guaranteed to be present
	number?: string; // Optional, as it's not guaranteed to be present
	address: string;
	postCode: string;
	recording: string;
	hasPOA: boolean;
} {
	const { analysis, artifact } = response.message; // Removed phoneNumber destructuring

	// Extracting full summary without splitting initially
	const fullSummary = analysis.summary;

	const nameMatch = fullSummary.match(/Name:\s*(.*?)(?:\\n|$)/); // Extracting name
	const name = nameMatch ? nameMatch[1].trim() : "Not provided"; // Default to "Not provided"

	const number = response.message.phoneNumber?.number; // Optional chaining for phoneNumber

	// Extracting address and post code from the full summary
	const addressMatch = fullSummary.match(/Client Address:\s*(.*?)(?:\\n|$)/);
	const postCodeMatch = fullSummary.match(/Post Code:\s*(.*?)(?:\\n|$)/);

	const address = addressMatch ? addressMatch[1].trim() : "Not provided";
	const postCode = postCodeMatch ? postCodeMatch[1].trim() : "Not provided";

	const recording = artifact.recordingUrl; // Ensure artifact is used correctly

	// Assuming POA (Power of Attorney) is mentioned in the summary
	const hasPOA = fullSummary.includes("Has POA: True");

	// Split the summary first by the specified sentence, then by '---'
	const trimmedSummary = fullSummary.split("Here's the requested information in the specified format:")[0].trim();
	const finalSummary = trimmedSummary.split('---')[0].trim(); // Split by '---' after the first split

	return {
		summary: finalSummary,
		name,
		number: response.message.customer.number,
		address,
		postCode,
		recording,
		hasPOA,
	};
}

export function formatEmailHtml(data: ReturnType<typeof transformData>): string {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Email Summary</h2>
    <strong>Name:</strong> ${data.name}<br><br>
    
    <strong>Summary:</strong><br>
    ${data.summary}<br><br>

    <strong>Phone Number:</strong> ${data.number ? data.number : 'Not provided'}<br>
    <strong>Address:</strong> ${data.address}<br>
    <strong>Post Code:</strong> ${data.postCode}<br>
    <strong>Recording URL:</strong> <a href="${data.recording}">${data.recording}</a><br>
    <strong>Has POA:</strong> ${data.hasPOA ? 'Yes' : 'No'}<br>
  </div>
  `;
}