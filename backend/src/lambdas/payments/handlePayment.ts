import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { PaymentIntentDescription } from "src/models/payments";
import { photosService } from "src/services/photosService";

const handlePayment = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> => {
  const { body } = event as unknown as any;
  switch (body.type) {
    case "payment_intent.succeeded": {
      const description: PaymentIntentDescription = JSON.parse(
        body.data.object.description
      );
      const { albumId, userId } = description;
      await photosService.activateAlbumPhotos(albumId, userId);
    }
  }
  return { statusCode: 200 };
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(errorHandlerMiddleware())
  .handler(handlePayment);
