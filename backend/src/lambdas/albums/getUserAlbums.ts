import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { albumsService } from "src/services/albumsService";
import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return responseCreator.error(400);
    }
    const { currentUser: id } = event.requestContext.authorizer.lambda;
    const albums = await albumsService.getAllUserAlbums(id);
    return responseCreator.default(JSON.stringify(albums), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
