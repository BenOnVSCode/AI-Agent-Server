import { transformData } from "../services/transform";
import dotenv from "dotenv"
dotenv.config();
describe("Data Transformation", () => {
  it("should transform response data correctly", () => {
    const response = {
      message: {
        timestamp: Date.now(),
        type: 'someType',
        analysis: {
          summary: 'Based on the transcript, here is a summary and the requested information:\n' +
          '\n' +
          "Summary: Mary Fitzgerald received a call blocking device from SmartABox that was not ordered or requested. Her daughter called to inquire about returning the device. The customer service representative confirmed that the device can be returned within 14 days for a full refund if it's in good condition. The return address was provided.\n" +
          '\n' +
          '`\n' +
          '----------------------------------\n' +
          'Name: Mary Fitzgerald \\n\n' +
          'Post Code: SA13 2SA \\n\n' +
          'Client Address: Not provided in the transcript \\n\n' +
          'Has POA: False \\n\n' +
          'Phone number: Not provided in the transcript \\n\n' +
          '----------------------------------\n',
          successEvaluation: 'someEvaluation',
        },
        artifact: {
          recordingUrl: 'someUrl',
        },
        phoneNumber: { number: '1234567890' }, // Added phoneNumber
        customer: { number: '0987654321' },   // Added customer
      },
    };


    const expectedOutput = {
      summary: "Client Address: 123 Test St\nPost Code: 12345",
      number: undefined, // Assuming phoneNumber is not provided
      address: "123 Test St",
      postCode: "12345",
      recording: "https://example.com/recording",
      hasPOA: false, // Assuming "Has POA: True" is not in the summary
    };
    
    expect(transformData(response)).toEqual(expectedOutput);
  });
});