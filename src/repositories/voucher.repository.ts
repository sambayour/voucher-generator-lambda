import {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { db } from "../services/database";
import { Voucher } from "../entities/voucher.entity";
import { v4 as uuidv4, v4 } from "uuid";

export class VoucherRepository {
  private static table = process.env.TABLE_NAME;

  static async create(voucher: Voucher): Promise<void> {
    try {
      const command = new PutCommand({
        TableName: this.table,
        Item: {
          id: v4(),
          ...voucher,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
          deletedAt: null,
        },
      });
      await db.send(command);
    } catch (error) {
      throw error;
    }
  }

  static async getByCode(code: string): Promise<Voucher | undefined> {
    const command = new GetCommand({
      TableName: this.table,
      Key: { code },
    });
    const result = await db.send(command);
    return result.Item as Voucher | undefined;
  }

  static async scanExpiredVouchers(currentDate: string): Promise<Voucher[]> {
    const command = new ScanCommand({
      TableName: this.table,
      FilterExpression: "expiryDate <= :currentDate and status = :status",
      ExpressionAttributeValues: {
        ":currentDate": currentDate,
        ":status": "valid",
      },
    });
    const result = await db.send(command);
    return result.Items as Voucher[];
  }

  static async invalidateVoucher(code: string): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.table,
      Key: { code },
      UpdateExpression: "set status = :status",
      ExpressionAttributeValues: {
        ":status": "invalid",
      },
    });
    await db.send(command);
  }
}
