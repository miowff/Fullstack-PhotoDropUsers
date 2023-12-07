import AWS from "aws-sdk";
import { S3FolderNames } from "src/enums/s3FolderNames";
import { ApiError } from "src/errors/apiError";

class S3Service {
  private readonly bucketName = "photo-drop-images";
  private readonly s3 = new AWS.S3({ region: "us-east-1" });
  createPreSignedPostUrl = async (
    userId: string,
    photoName: string,
    type: string
  ) => {
    const s3BucketName = this.bucketName;
    const params = {
      Bucket: s3BucketName,
      Conditions: [["content-length-range", 0, 10000000]],
      Fields: {
        Key: `${S3FolderNames.PROFILE_PICS}/${userId}/` + photoName,
        ContentType: type,
      },
    };
    const url = await this.s3.createPresignedPost(params);
    return url;
  };
  createAccessPhotoUrl = async (key: string): Promise<string> => {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 3000,
    };
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl("getObject", params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  };
  getImageAsBase64 = async (key: string): Promise<string> => {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };
    const { Body } = await this.s3.getObject(params).promise();
    if (!Body) {
      throw ApiError.NotFound("S3 Object");
    }
    return Body.toString("base64");
  };
}

export const s3Service = new S3Service();
