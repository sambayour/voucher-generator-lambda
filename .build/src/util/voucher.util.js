"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVoucherCode = void 0;
const crypto_1 = require("crypto");
const offensiveWords_1 = require("./offensiveWords");
function generateVoucherCode() {
    let code;
    do {
        code = (0, crypto_1.randomBytes)(8).toString("hex").toUpperCase();
    } while (offensiveWords_1.OFFENSIVE_WORDS.some((word) => code.includes(word)));
    return code;
}
exports.generateVoucherCode = generateVoucherCode;
