import { ICodesRepository } from "src/db/IRepositories/ICodesRepository";
import { ICodesService } from "./IServices/ICodesService";
import { InsertPhoneCode, SelectPhoneCode } from "src/db/entities/phoneCode";
import { codesRepository } from "src/db/repositories/codesRepository";
import crypto from "crypto";
import { ApiError } from "src/errors/apiError";
class CodesService implements ICodesService {
  constructor(
    private readonly phoneCodesRepository: ICodesRepository<
      InsertPhoneCode,
      SelectPhoneCode
    >
  ) {}
  sendCode = async (phoneNumber: string): Promise<void> => {
    const code = crypto.randomInt(100000, 999999);
    const existsCode = await this.phoneCodesRepository.getCode(phoneNumber);
    if (existsCode) {
      existsCode.code = code;
      existsCode.resendTries = 1;
      await this.phoneCodesRepository.updateCode(existsCode);
      return;
    }
    const insertPhoneCodePair: InsertPhoneCode = {
      phoneNumber,
      code: code,
      sentTime: Math.floor(Date.now() / 1000),
      resendTries: 1,
    };
    await this.phoneCodesRepository.addCode(insertPhoneCodePair);
  };
  resendCode = async (phoneNumber: string) => {
    const existsCode = await this.phoneCodesRepository.getCode(phoneNumber);
    if (!existsCode) {
      throw ApiError.NotFound("Code");
    }
    const { resendTries } = existsCode;
    if (resendTries === 0) {
      throw new ApiError("Resend tries is over", 403);
    }
    const code = crypto.randomInt(100000, 999999);
    existsCode.code = code;
    existsCode.resendTries = 0;
    await this.phoneCodesRepository.updateCode(existsCode);
  };
  validateCode = async (
    phoneNumber: string,
    userCode: string
  ): Promise<void> => {
    const existsCode = await this.phoneCodesRepository.getCode(phoneNumber);
    if (!existsCode) {
      throw ApiError.NotFound("Code");
    }
    const { code, sentTime } = existsCode;
    if (!code) {
      throw ApiError.NotFound("Confirmation Code");
    }
    if (+userCode !== code) {
      throw new ApiError("Invalid code!", 403);
    }
    const currentDate = Math.floor(Date.now() / 1000);
    const dateDif = currentDate - sentTime;
    const threeMinInUnix = 3 * 60;
    if (dateDif > threeMinInUnix) {
      throw new ApiError("Code expired", 403);
    }
    await this.phoneCodesRepository.deleteCode(phoneNumber);
  };
}
export const codesService = new CodesService(codesRepository);
