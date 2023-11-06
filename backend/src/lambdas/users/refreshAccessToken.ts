import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { userService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { refreshToken } = JSON.parse(event.body);
    const tokens = await userService.refreshAccessToken(refreshToken);
    return responseCreator.default(JSON.stringify(tokens), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
