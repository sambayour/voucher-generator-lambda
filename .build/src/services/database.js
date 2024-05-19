"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
exports.db = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({
    endpoint: process.env.DYNAMODB_ENDPOINT,
}));
