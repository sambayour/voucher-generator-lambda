"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherRepository = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const database_1 = require("../services/database");
const uuid_1 = require("uuid");
class VoucherRepository {
    static create(voucher) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new lib_dynamodb_1.PutCommand({
                    TableName: this.table,
                    Item: Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, voucher), { createdAt: new Date().toLocaleString(), updatedAt: new Date().toLocaleString(), deletedAt: null }),
                });
                yield database_1.db.send(command);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.GetCommand({
                TableName: this.table,
                Key: { code },
            });
            const result = yield database_1.db.send(command);
            return result.Item;
        });
    }
    static scanExpiredVouchers(currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.ScanCommand({
                TableName: this.table,
                FilterExpression: "expiryDate <= :currentDate and status = :status",
                ExpressionAttributeValues: {
                    ":currentDate": currentDate,
                    ":status": "valid",
                },
            });
            const result = yield database_1.db.send(command);
            return result.Items;
        });
    }
    static invalidateVoucher(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new lib_dynamodb_1.UpdateCommand({
                TableName: this.table,
                Key: { code },
                UpdateExpression: "set status = :status",
                ExpressionAttributeValues: {
                    ":status": "invalid",
                },
            });
            yield database_1.db.send(command);
        });
    }
}
exports.VoucherRepository = VoucherRepository;
VoucherRepository.table = process.env.TABLE_NAME;
