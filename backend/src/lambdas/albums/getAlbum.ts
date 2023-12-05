import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { albumsService } from "src/services/albumsService";
import responseCreator from "src/services/utils/responseCreator";

const getAlbumWithPhotos = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.requestContext.authorizer) {
    return responseCreator.error(400);
  }
  if (!event.queryStringParameters) {
    return responseCreator.missedQueryStringParams();
  }
  const { albumId } = event.queryStringParameters;
  if (!albumId) {
    return responseCreator.missedQueryStringParams();
  }
  const { currentUser: id } = event.requestContext.authorizer.lambda;
  const album = await albumsService.getAlbum(albumId, id);
  return responseCreator.default(JSON.stringify(album), 200);
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(getAlbumWithPhotos);
