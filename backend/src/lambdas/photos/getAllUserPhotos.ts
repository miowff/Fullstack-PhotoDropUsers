import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { photosService } from "src/services/photosService";
import responseCreator from "src/services/utils/responseCreator";

const getAllPhotos = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.requestContext.authorizer) {
    return responseCreator.error(400);
  }
  const { currentUser: id } = event.requestContext.authorizer.lambda;
  const photos = await photosService.getAllUserPhotos(id);
  return responseCreator.default(JSON.stringify(photos), 200);
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(getAllPhotos);
