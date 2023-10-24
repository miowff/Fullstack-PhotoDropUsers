export interface ICodesService {
  sendCode(phoneNumber: string): Promise<void>;
  validateCode(phoneNumber: string, userCode: string): Promise<void>;
}
