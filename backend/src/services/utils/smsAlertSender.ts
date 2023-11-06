import { usersRepository } from "src/db/repositories/usersRepository";
import { jwtTokenService } from "./jwtTokensService";
import { accessUrlGenerator } from "./accessUrlGenerator";

export const sendSmsAlerts = async (phoneNumbers: string[]) => {
  for (let i = 0; i < phoneNumbers.length; i++) {
    const user = await usersRepository.getByPhoneNumber(phoneNumbers[i]);
    if (user) {
      const { id } = user;
      const { accessToken, refreshToken } =
        await jwtTokenService.generateAccessToken(id);
      const accessUrl = accessUrlGenerator(accessToken, refreshToken);
      console.log(accessUrl);
    }
  }
};
