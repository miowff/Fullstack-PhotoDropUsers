import { usersRepository } from "src/db/repositories/usersRepository";
import { jwtTokenService } from "./jwtTokensService";
import { accessUrlGenerator } from "./accessUrlGenerator";
import twilioSmsSender from "./twilioSmsSender";

export const sendSmsAlerts = async (phoneNumbers: string[]) => {
  for (const number of phoneNumbers) {
    const user = await usersRepository.getByPhoneNumber(number);
    if (user) {
      const { id } = user;
      const { accessToken, refreshToken } =
        await jwtTokenService.generateAccessToken(id);
      const accessUrl = accessUrlGenerator(accessToken, refreshToken);
      await twilioSmsSender.sendMessage(
        `PhotoDrop: your photos have dropped. Check them out here: ${accessUrl}`,
        `+${number}`
      );
      console.log("alert sent!")
    }
  }
};
