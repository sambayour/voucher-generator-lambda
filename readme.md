# Voucher Management System

This project is a voucher management system built using AWS services and the Serverless framework. It includes functionalities to generate, retrieve, and invalidate vouchers.

## Architecture

The voucher management system consists of the following components:

- **AWS Lambda**: For handling the backend logic.
- **AWS DynamoDB**: For storing voucher information.
- **Serverless Framework**: To manage the infrastructure as code.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- [AWS CLI](https://aws.amazon.com/cli/) (configured with appropriate permissions)
- Docker (for running DynamoDB locally)

## Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/sambayour/voucher-generator-lambda
cd voucher-generator-lambda
npm install
```

## Configuration

Create a .env file in the root directory with the following content:

```dotenv
Copy code
DYNAMODB_ENDPOINT=http://localhost:8000
TABLE_NAME=Vouchers
TZ=UTC
```

## Usage

### Endpoints

Generate Voucher: POST /vouchers/generate

Request Body:

```json
{
  "value": 200,
  "expiryDate": "2024-05-20"
}
```

Response:

```json
{
  "code": "GENERATED_VOUCHER_CODE",
  "value": 200,
  "expiryDate": "2024-05-20"
}
```

Retrieve Voucher: GET /vouchers/{code}

Response:

```json
{
  "code": "VOUCHER_CODE",
  "value": 200,
  "expiryDate": "2024-05-20"
}
```

Invalidate Expired Vouchers: This is a scheduled function that runs daily to invalidate expired vouchers.

### Local Development

To start the local development environment, follow these steps:

Start Docker, when you are sure Docker is running

run the following command to run the start the serverless application offline

```sh
npm run start:sls
```

This will start a local server on http://localhost:3000.

### Testing the Endpoints

You can use tools like Postman or curl to test the endpoints.

Example using curl:

Generate Voucher:

```sh
curl -X POST http://localhost:3000/vouchers/generate -H "Content-Type: application/json" -d '{"value":200,"expiryDate":"2024-05-20"}'
```

Retrieve Voucher:

```sh
curl http://localhost:3000/vouchers/GENERATED_VOUCHER_CODE
```

### Deployment

To deploy the application to AWS, make sure you have provision your credetials currently and then run:

```sh
serverless deploy --stage dev
```

or

```sh
npm run deploy
```

Ensure your AWS credentials are configured correctly.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
