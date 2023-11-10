import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { SetFullName } from "src/models/user";

import { userService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return responseCreator.error(400);
    }
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { currentUser: id } = event.requestContext.authorizer.lambda;
    const { name } = JSON.parse(event.body) as SetFullName;
    const fullName = await userService.updateName(id, name);
    return responseCreator.default(JSON.stringify(fullName), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
