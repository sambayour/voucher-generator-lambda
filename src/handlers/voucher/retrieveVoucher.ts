import { APIGatewayProxyHandler } from "aws-lambda";
import { VoucherRepository } from "../../repositories/voucher.repository";

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.code) {
    throw new Error("Code parameter is missing");
  }

  const { code } = event.pathParameters;

  const voucher = await VoucherRepository.getByCode(code);

  if (!voucher) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Voucher not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(voucher),
  };
};
