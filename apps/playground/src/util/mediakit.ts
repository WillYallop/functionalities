import MediaKit from "mediakit";

export const localMediaKitInstance = new MediaKit({
  storeMethod: "local",
  localOptions: {
    directory: "./uploads",
  },
});

export const s3MediaKitInstance = new MediaKit({
  storeMethod: "s3",
  s3Options: {
    bucket: "my-bucket",
    region: "us-east-1",
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  },
});
