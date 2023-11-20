import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { validateBodyMiddleware } from "src/middleware/bodyValidator";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { RefreshTokens } from "src/models/tokensResponse";
import { userService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

const refreshAccessTokenBody = Joi.object({
  refreshToken: Joi.string().required(),
});

const refreshAccessToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { refreshToken } = event.body as unknown as RefreshTokens;
  const tokens = await userService.refreshAccessToken(refreshToken);
  return responseCreator.default(JSON.stringify(tokens), 200);
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(refreshAccessTokenBody))
  .use(errorHandlerMiddleware())
  .handler(refreshAccessToken);
