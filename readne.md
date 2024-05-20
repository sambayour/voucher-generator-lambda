# Voucher Management System

This project is a voucher management system built using AWS services and the Serverless framework. It includes functionalities to generate, retrieve, and invalidate vouchers.

## Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [License](#license)

## Architecture

The voucher management system consists of the following components:

- **AWS Lambda**: For handling the backend logic.
- **AWS DynamoDB**: For storing voucher information.
- **Serverless Framework**: To manage the infrastructure as code.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
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
