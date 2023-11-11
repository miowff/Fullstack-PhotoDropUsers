import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { S3FolderNames } from "src/enums/s3FoulderNames";
import { RequestUploadPhotoUrl } from "src/models/user";
import responseCreator from "src/services/utils/responseCreator";
import { s3Service } from "src/services/utils/s3Service";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.requestContext.authorizer) {
      return responseCreator.error(400);
    }
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { currentUser: id } = event.requestContext.authorizer.lambda;
    const { type, fileName } = JSON.parse(event.body) as RequestUploadPhotoUrl;
    const url = await s3Service.createPreSignedPostUrl(id, fileName, type);
    const profilePicKey = `${S3FolderNames.PROFILE_PICS}/${id}/${fileName}`;
    const accessUrl = await s3Service.createAccessPhotoUrl(profilePicKey);
    return responseCreator.default(JSON.stringify({ url, accessUrl }), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
