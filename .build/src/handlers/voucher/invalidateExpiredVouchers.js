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
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const voucher_repository_1 = require("../../repositories/voucher.repository");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
function invalidateExpiredVouchers() {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date().toISOString();
        const expiredVouchers = yield voucher_repository_1.VoucherRepository.scanExpiredVouchers(now);
        const updatePromises = expiredVouchers.map((voucher) => {
            return voucher_repository_1.VoucherRepository.invalidateVoucher(voucher.code);
        });
        yield Promise.all(updatePromises);
    });
}
const handler = () => __awaiter(void 0, void 0, void 0, function* () {
    yield invalidateExpiredVouchers();
});
exports.handler = handler;
