import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { paymentsService } from "src/services/PaymentsService";
import responseCreator from "src/services/utils/responseCreator";

const createIntent = async (
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
  const paymentUrl = await paymentsService.createPaymentIntent(albumId, id);
  return responseCreator.default(JSON.stringify({ paymentUrl }), 200);
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(createIntent);
