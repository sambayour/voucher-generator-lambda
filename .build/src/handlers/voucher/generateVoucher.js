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
const voucher_util_1 = require("../../util/voucher.util");
const voucher_repository_1 = require("../../repositories/voucher.repository");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.body) {
        throw new Error("Request body is missing");
    }
    const { value, expiryDate } = JSON.parse(event.body);
    const voucherCode = (0, voucher_util_1.generateVoucherCode)();
    const voucher = {
        code: voucherCode,
        value,
        expiryDate,
        status: "valid",
    };
    try {
        yield voucher_repository_1.VoucherRepository.create(voucher);
        return {
            statusCode: 201,
            body: JSON.stringify({ code: voucherCode }),
        };
    }
    catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: error,
            }),
        };
    }
});
exports.handler = handler;
