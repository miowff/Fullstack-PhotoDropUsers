import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { LoginModel } from "src/models/user";
import { userService } from "src/services/usersService";

import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const loginRequest = JSON.parse(event.body) as LoginModel;
    const authToken = await userService.loginUser(loginRequest);
    return responseCreator.default(JSON.stringify(authToken), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
