import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { SetEmail, SetFullName } from "src/models/user";

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
    if (!event.pathParameters) {
      return responseCreator.missedPathParameters();
    }
    const update = event.pathParameters["update"] as string;
    const { currentUser: id } = event.requestContext.authorizer.lambda;
    switch (update) {
      case "email": {
        const { email } = JSON.parse(event.body) as SetEmail;
        const newEmail = await userService.updateEmail(id, email);
        return responseCreator.default(JSON.stringify(newEmail), 200);
      }
      case "name": {
        const { name } = JSON.parse(event.body) as SetFullName;
        const fullName = await userService.updateName(id, name);
        return responseCreator.default(JSON.stringify(fullName), 200);
      }
      default: {
        return responseCreator.missedPathParameters();
      }
    }
  } catch (err) {
    return responseCreator.error(err);
  }
};
