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
const voucher_repository_1 = require("../../repositories/voucher.repository");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.pathParameters || !event.pathParameters.code) {
        throw new Error("Code parameter is missing");
    }
    const { code } = event.pathParameters;
    const voucher = yield voucher_repository_1.VoucherRepository.getByCode(code);
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
});
exports.handler = handler;
