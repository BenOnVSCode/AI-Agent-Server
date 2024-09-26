# Webhook Server

A Fastify-based server that processes incoming webhook requests, transforms the data, and sends formatted emails using Mailgun.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

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

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   EMAILS="your_email@example.com"
   MAILGUN_API_KEY="your_mailgun_api_key"
   DOMAIN="your_mailgun_domain"
   ```

   Replace the placeholders with your actual Mailgun API key and domain.

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

3. **Check your email for the formatted report.**

## Environment Variables

- `EMAILS`: Comma-separated list of email addresses to send reports to.
- `MAILGUN_API_KEY`: Your Mailgun API key.
- `DOMAIN`: Your Mailgun domain.

## Testing

To run tests, use the following command:

```bash
npm test
```

This will execute the Jest tests defined in the `src/tests` directory.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.