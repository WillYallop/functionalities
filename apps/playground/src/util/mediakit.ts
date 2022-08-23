import MediaKit from "mediakit";
import dotenv from "dotenv";
dotenv.config();

export const localMediaKitInstance = new MediaKit({
  storeMethod: "local",
  localOptions: {
    directory: "./uploads",
  },
});

export const s3MediaKitInstance = new MediaKit({
  storeMethod: "s3",
  s3Options: {
    bucket: "oxygen-bucket",
    region: "eu-central-1",
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});
