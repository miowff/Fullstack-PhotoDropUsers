export interface IUsersRepository<TInsert, TSelect> {
  getByPhoneNumber(phoneNumber: string): Promise<TSelect>;
  addUser(user: TInsert): Promise<void>;
  getById(userId: string): Promise<TSelect>;
}
