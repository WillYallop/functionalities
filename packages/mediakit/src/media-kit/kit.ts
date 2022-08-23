// Types
import {
  MK_Options,
  MK_OptionsParam,
  ST_SaveFileResponse,
  MK_SaveSingleFileRes,
} from "../../types";
import { ReadStream } from "fs";
// Class
import ImageKit from "../image-kit/kit";
import VideoKit from "../video-kit/kit";
import S3Store from "./stores/s3";
import LocalStore from "./stores/local";
// Util
import flattenImages from "../image-kit/util/flatten-images";
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
  async save(media: ImageKit | VideoKit, folder?: string) {
    const savedFiles: Map<string, MK_SaveSingleFileRes> = new Map();

    if (media instanceof ImageKit) {
      const flatData = flattenImages(media.images);
      for (let i = 0; i < flatData.length; i++) {
        // check if there is a savedFiles map instaqnce with this key
        if (!savedFiles.has(flatData[i].key)) {
          savedFiles.set(flatData[i].key, {
            key: flatData[i].key,
            name: flatData[i].name,
            height: flatData[i].height,
            width: flatData[i].width,
            folder: folder,
            files: [],
          });
        }
        // get map instance for this key
        const savedFile = savedFiles.get(flatData[i].key);
        const saveRes = await this.store.save(
          flatData[i].key,
          flatData[i].data,
          folder
        );
        if (savedFile) savedFile.files.push(saveRes);
      }
    } else if (media instanceof VideoKit) {
    }

    media.close();
    return Array.from(savedFiles.values());
  }
  delete(key: string, folder?: string) {
    return this.store.delete(key, folder);
  }
  get(key: string, folder?: string) {
    return this.store.get(key, folder);
  }
  // stream media
  stream(key: string, folder?: string): ReadStream | null {
    return this.store.stream(key, folder);
  }
}
