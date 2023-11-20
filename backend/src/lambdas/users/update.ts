import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { validateBodyMiddleware } from "src/middleware/bodyValidator";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { SetEmail, SetFullName } from "src/models/user";
import { userService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

const updateBody = Joi.object({
  email: Joi.string(),
  name: Joi.string(),
});

const update = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.requestContext.authorizer) {
    return responseCreator.error(400);
  }
  if (!event.pathParameters) {
    return responseCreator.missedPathParameters();
  }
  const update = event.pathParameters["update"] as string;
  const { currentUser: id } = event.requestContext.authorizer.lambda;
  switch (update) {
    case "email": {
      const { email } = event.body as unknown as SetEmail;
      const newEmail = await userService.updateEmail(id, email);
      return responseCreator.default(JSON.stringify(newEmail), 200);
    }
    case "name": {
      const { name } = event.body as unknown as SetFullName;
      const fullName = await userService.updateName(id, name);
      return responseCreator.default(JSON.stringify(fullName), 200);
    }
    default: {
      return responseCreator.missedPathParameters();
    }
  }
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(updateBody))
  .use(errorHandlerMiddleware())
  .handler(update);
