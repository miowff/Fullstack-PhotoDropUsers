import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { S3FolderNames } from "src/enums/s3FolderNames";
import { validateBodyMiddleware } from "src/middleware/bodyValidator";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { RequestUploadPhotoUrl } from "src/models/user";
import responseCreator from "src/services/utils/responseCreator";
import { s3Service } from "src/services/utils/s3Service";

const requestUploadPhotoUrlBody = Joi.object({
  fileName: Joi.string().required(),
  type: Joi.string().required(),
});

const requestUploadPhotoUrl = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.requestContext.authorizer) {
    return responseCreator.error(400);
  }
  const { currentUser: id } = event.requestContext.authorizer.lambda;
  const { type, fileName } = event.body as unknown as RequestUploadPhotoUrl;
  const url = await s3Service.createPreSignedPostUrl(id, fileName, type);
  const profilePicKey = `${S3FolderNames.PROFILE_PICS}/${id}/${fileName}`;
  const accessUrl = await s3Service.createAccessPhotoUrl(profilePicKey);
  return responseCreator.default(JSON.stringify({ url, accessUrl }), 200);
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(requestUploadPhotoUrlBody))
  .use(errorHandlerMiddleware())
  .handler(requestUploadPhotoUrl);
