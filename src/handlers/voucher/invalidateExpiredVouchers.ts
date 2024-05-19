import { DynamoDB } from "aws-sdk";
import { VoucherRepository } from "../../repositories/voucher.repository";

const dynamoDb = new DynamoDB.DocumentClient();

async function invalidateExpiredVouchers() {
  const now = new Date().toISOString();
  const expiredVouchers = await VoucherRepository.scanExpiredVouchers(now);

  const updatePromises = expiredVouchers.map((voucher: { code: string }) => {
    return VoucherRepository.invalidateVoucher(voucher.code);
  });

  await Promise.all(updatePromises);
}

export const handler = async () => {
  await invalidateExpiredVouchers();
};
