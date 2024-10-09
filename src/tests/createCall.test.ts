import { createCall } from '../services/createCall';

describe('createCall Function', () => {
  it('should create a call and return response data', async () => {
    const name = 'Test User'; // Replace with a valid name for testing

    // Call the createCall function
    const response = await createCall(name, "", "");

    // Check if the response contains expected properties
    expect(response).toHaveProperty('id'); // Assuming the response contains an 'id'
    expect(response).toHaveProperty('status'); // Assuming the response contains a 'status'
    expect(response.status).toBe('success'); // Adjust based on expected status
  });
});