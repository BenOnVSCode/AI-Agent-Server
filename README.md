# Webhook Server

A Fastify-based server that processes incoming webhook requests, make calls.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/webhook-server.git
   cd webhook-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file by copying the existing `.env.example`
   
   EMAILS: This should contain the email address or list of emails used for system notifications or user verification.
   DATABASE_URL: The connection string for your database, including the username, password, host, and database name (e.g., postgres://user:password@localhost:5432/mydatabase).
   RESEND_API_KEY: Your API key for Resend—a service used for sending emails. You can get this API key from your Resend account dashboard.
   VAPI_API_KEY: The API key for accessing the VAPI service, used for interacting with their API.
   JWT_SECRET: A secret key for signing and verifying JSON Web Tokens (JWT). It is crucial for secure authentication and session management. Ensure this is a strong and random string.
   SALES_NUMBER_ID= Sales number's ID
   VERIFICATION_NUMBER_ID= Verfication number ID
   FINANCE_CAR_NUMBER_ID= Finance Car number ID

   Replace the placeholders with your actual keys.

## Usage

1. **Run the server in development mode:**

   ```bash
   npm run dev
   ```

   This will start the server on port 7000.

2. **Send a POST request to the webhook endpoint:**

   Use a tool like Postman or cURL to send a request to:

   ```
   POST http://localhost:7000/costumer_service/vapi_webhook
   ```

   **Request Body Example:**

   ```json
   {
     "message": {
       "phoneNumber": {
         "number": "1234567890"
       },
       "analysis": {
         "summary": "Your summary here."
       },
       "artifact": {
         "recordingUrl": "https://example.com/recording"
       },
       "customer": {
         "number": "0987654321"
       }
     }
   }
   ```


## Testing

To run tests, use the following command:

```bash
npm test
```

This will execute the Jest tests defined in the `src/tests` directory.
