// Types
import { MK_Options, MK_OptionsParam } from "../../types";
// Class
import ImageKit from "./image";
import VideoKit from "./video";
import S3Store from "../stores/s3";
import LocalStore from "../stores/local";
//
import path from "path";

export default class MediaKit {
  options: MK_Options;
  store: S3Store | LocalStore;
  constructor(options: MK_OptionsParam) {
    // set options
    const defaultOptions: MK_Options = {
      storeMethod: "local",
      s3Options: {
        accessKeyId: "",
        secretAccessKey: "",
        region: "",
        bucket: "",
      },
      localOptions: {
        directory: path.resolve("/media"),
      },
      keyPrefix: "",
    };
    this.options = { ...defaultOptions, ...options };

    // create store
    switch (this.options.storeMethod) {
      case "s3":
        this.store = new S3Store(this.options.s3Options);
        break;
      case "local":
        this.store = new LocalStore(this.options.localOptions);
        break;
      default:
        throw new Error("Invalid store method");
    }
  }

  // abstractions on top of store methods
  save(media: ImageKit | VideoKit) {
    // console.log(media);

    if (media instanceof ImageKit) {
      console.log(media.images);
      return {
        success: media.images,
      };
    }
  }
  delete(id: string) {
    console.log(id);
  }
  get(id: string) {
    console.log(id);
  }
  // stream media
  stream(id: string) {
    console.log(id);
  }
}
