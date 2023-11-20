import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { validateBodyMiddleware } from "src/middleware/bodyValidator";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { LoginRegistrationModel } from "src/models/user";
import { userService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

const loginOrRegisterBody = Joi.object({
  phoneNumber: Joi.string().required(),
  code: Joi.string().min(6).max(6).required(),
});

const loginOrRegister = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const registrationRequest = event.body as unknown as LoginRegistrationModel;
  const authToken = await userService.loginOrRegister(registrationRequest);
  return responseCreator.default(JSON.stringify(authToken), 200);
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(loginOrRegisterBody))
  .use(errorHandlerMiddleware())
  .handler(loginOrRegister);
