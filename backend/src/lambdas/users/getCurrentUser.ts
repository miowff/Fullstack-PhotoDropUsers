import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";

import { userService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

const getCurrentUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return responseCreator.error(400);
    }
    const { currentUser: id } = event.requestContext.authorizer.lambda;
    const user = await userService.getById(id);
    return responseCreator.default(JSON.stringify(user), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(getCurrentUser);
