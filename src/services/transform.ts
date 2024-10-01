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
	const { analysis, artifact } = response.message;

	// Extracting full summary
	const fullSummary = analysis?.summary || ""; // Default to empty string if not present

	// Extracting name
	const nameMatch = fullSummary.match(/Name:\s*(.*?)(?:\\n|$)/);
	const name = nameMatch ? nameMatch[1].trim() : "Not provided"; // Default to "Not provided"

	// Extracting number
	let number = response.message.customer?.number || "Unknown"; // Default to "Unknown"

	// Extracting address and post code
	const addressMatch = fullSummary.match(/Client Address:\s*(.*?)(?:\\n|$)/);
	const postCodeMatch = fullSummary.match(/Post Code:\s*(.*?)(?:\\n|$)/);

	const address = addressMatch ? addressMatch[1].trim() : "Not provided";
	const postCode = postCodeMatch ? postCodeMatch[1].trim() : "Not provided";

	const recording = artifact?.recordingUrl || "Not provided"; // Default to "Not provided" if not present

	// Assuming POA (Power of Attorney) is mentioned in the summary
	const hasPOA = fullSummary.includes("Has POA: True");

	// Split the summary first by the specified sentence, then by '---'
	const trimmedSummary = fullSummary.split("Here's the requested information in the specified format:")[0].trim();
	const finalSummary = trimmedSummary.split('---')[0].trim(); // Split by '---' after the first split

	return {
		summary: finalSummary || "No summary available", // Default if finalSummary is empty
		name,
		number,
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

    <strong>Phone Number:</strong> ${data.number}<br>
    <strong>Address:</strong> ${data.address}<br>
    <strong>Post Code:</strong> ${data.postCode}<br>
    <strong>Recording URL:</strong> <a href="${data.recording}">${data.recording}</a><br>
    <strong>Has POA:</strong> ${data.hasPOA ? 'Yes' : 'No'}<br>
  </div>
  `;
}