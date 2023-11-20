import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { validateBodyMiddleware } from "src/middleware/bodyValidator";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { RequestCode } from "src/models/user";
import { codesService } from "src/services/codesService";
import responseCreator from "src/services/utils/responseCreator";
const getCodeBody = Joi.object({
  phoneNumber: Joi.string().required(),
});

const getCode = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { phoneNumber } = event.body as unknown as RequestCode;
  if (!event.queryStringParameters) {
    await codesService.sendCode(phoneNumber);
    return responseCreator.default(JSON.stringify("Code sent!"), 200);
  }
  const { resend } = event.queryStringParameters;
  if (!resend) {
    return responseCreator.missedQueryStringParams();
  }
  if (/true/.test(resend)) {
    await codesService.resendCode(phoneNumber);
    return responseCreator.default(JSON.stringify("Code sent!"), 200);
  }
  return responseCreator.default(
    JSON.parse(`Incorrect query param resend = ${resend}`),
    400
  );
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(getCodeBody))
  .use(errorHandlerMiddleware())
  .handler(getCode);
