import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";

import { photosService } from "src/services/photosService";
import responseCreator from "src/services/utils/responseCreator";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return responseCreator.error(400);
    }
    const { currentUser: id } = event.requestContext.authorizer.lambda;
    const photos = await photosService.getAllUserPhotos(id);
    return responseCreator.default(JSON.stringify(photos), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
