import { randomBytes } from "crypto";
import { OFFENSIVE_WORDS } from "./offensiveWords";

function generateVoucherCode(): string {
  let code: string;
  do {
    code = randomBytes(8).toString("hex").toUpperCase();
  } while (OFFENSIVE_WORDS.some((word) => code.includes(word)));

  return code;
}

export { generateVoucherCode };
