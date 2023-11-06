import {
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEventV2,
} from "aws-lambda";
import { JwtPayload } from "jsonwebtoken";
import { ApiError } from "src/errors/apiError";
import { jwtTokenService } from "src/services/utils/jwtTokensService";

export async function handler(
  event: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewayAuthorizerResult> {
  try {
    const authToken = event.identitySource[0];
    console.log(authToken);
    const { userId } = (await jwtTokenService.validateAccessToken(
      authToken
    )) as JwtPayload;

    return {
      principalId: userId,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
      context: {
        currentUser: userId,
      },
    };
  } catch (err) {
    throw new ApiError("Unauthorized", 401);
  }
}
