import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { RegistrationModel } from "src/models/user";
import { userService } from "src/services/usersService";

import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const registrationRequest = JSON.parse(event.body) as RegistrationModel;
    const authToken = await userService.registerUser(registrationRequest);
    return responseCreator.default(JSON.stringify(authToken), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
