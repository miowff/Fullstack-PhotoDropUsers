export interface ICodesRepository<TInsert, TSelect> {
  addCode(phoneCode: TInsert): Promise<void>;
  getCode(phoneNumber: string): Promise<TSelect>;
  updateCode(phoneCode: TInsert): Promise<void>;
  deleteCode(phoneNumber: string): Promise<void>;
}
