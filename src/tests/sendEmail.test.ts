import { formatEmailHtml } from "../services/transform";
import { sendEmail } from "../services/email"; // Import sendEmail function
import dotenv from "dotenv"
dotenv.config();
describe("Email Formatting", () => {
  it("should format email text correctly and send email", async () => {
    const data = {
      summary: "Test Summary",
      number: "1234567890",
      address: "123 Test St",
      postCode: "12345",
      recording: "https://example.com/recording",
      hasPOA: true,
    };
    const html = formatEmailHtml(data)

    // Call sendEmail with the formatted email
    const result = await sendEmail(["abdeladim.benallal@hi5group.co.uk"], "Summary", html); // Assuming sendEmail returns a result
    expect(result).toBeTruthy(); // Adjust this based on what sendEmail returns
  });
});