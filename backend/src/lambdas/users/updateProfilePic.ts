import { S3Event } from "aws-lambda";
import { userService } from "src/services/usersService";

import responseCreator from "src/services/utils/responseCreator";

export const handler = async (event: S3Event) => {
  try {
    const { Records } = event;
    const key = decodeURI(Records[0].s3.object.key).replace("+", " ");
    const splittedKey = key.split("/");
    const photoKey = splittedKey[2];
    const userId = splittedKey[1];
    await userService.updateProfilePhotoKey(userId, photoKey);
  } catch (err) {
    return responseCreator.error(err);
  }
};
