import MediaKit from "mediakit";

const localMediaKitInstance = new MediaKit({
  storeMethod: "local",
  localOptions: {
    directory: "./uploads",
  },
  keyPrefix: "playground_",
});
