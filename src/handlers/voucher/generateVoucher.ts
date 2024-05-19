import { APIGatewayProxyHandler } from "aws-lambda";
import { generateVoucherCode } from "../../util/voucher.util";
import { VoucherRepository } from "../../repositories/voucher.repository";
import { Voucher } from "../../entities/voucher.entity";

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.body) {
    throw new Error("Request body is missing");
  }

  const { value, expiryDate } = JSON.parse(event.body);

  const voucherCode = generateVoucherCode();

  const voucher: Voucher = {
    code: voucherCode,
    value,
    expiryDate,
    status: "valid",
  };

  try {
    await VoucherRepository.create(voucher);

    return {
      statusCode: 201,
      body: JSON.stringify({ code: voucherCode }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error,
      }),
    };
  }
};
