import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { albumsService } from "src/services/albumsService";
import responseCreator from "src/services/utils/responseCreator";

const getAllUserAlbums = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.requestContext.authorizer) {
    return responseCreator.error(400);
  }
  const { currentUser: id } = event.requestContext.authorizer.lambda;
  const albums = await albumsService.getAllUserAlbums(id);
  return responseCreator.default(JSON.stringify(albums), 200);
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(getAllUserAlbums);
