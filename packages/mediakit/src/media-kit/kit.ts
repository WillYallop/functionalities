// Types
import {
  MK_Options,
  MK_OptionsParam,
  MK_SaveSingleVideoRes,
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
            success: true,
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

        // skip if the previous file for this instances has failed
        if (!savedFile?.success) continue;

        // save file
        const saveRes = await this.store.save(
          flatData[i].key,
          flatData[i].data,
          folder
        );

        if (savedFile) {
          // if it returns false, then mark the savedFiles map instance as faild and continue
          if (!saveRes.saved) {
            savedFile.success = false;
            continue;
          }
          if (savedFile.files) {
            savedFile.files.push(saveRes);
          }
        }
      }
    } else if (media instanceof VideoKit) {
      // convert the Videokit.videos map to an array
      const videos = Array.from(media.videos.values());
      for (let i = 0; i < videos.length; i++) {
        // check if there is a savedFiles map instaqnce with this key
        if (!savedFiles.has(videos[i].key)) {
          savedFiles.set(videos[i].key, {
            success: true,
            key: videos[i].key,
            name: videos[i].data.name,
            folder: folder,
            files: [],
          });
        }
        // get map instance for this key
        const savedFile = savedFiles.get(videos[i].key);

        // skip if the previous file for this instances has failed
        if (!savedFile?.success) continue;

        // save file
        const saveRes = await this.store.saveVideo(
          videos[i].key,
          videos[i].data,
          folder
        );

        if (saveRes) {
          // if it returns false, then mark the savedFiles map instance as faild and continue
          if (!saveRes.saved) {
            savedFile.success = false;
            continue;
          }
          if (savedFile.files) {
            savedFile.files.push(saveRes);
          }
        }
      }
    }

    media.close();
    return Array.from(savedFiles.values());
  }
  async delete(key: string, folder?: string) {
    return await this.store.delete(key, folder);
  }
  async get(key: string, folder?: string) {
    return await this.store.get(key, folder);
  }
  // stream media
  stream(key: string, folder?: string) {
    return this.store.stream(key, folder);
  }
  streamVideo(key: string, range: string = "", folder?: string) {
    return this.store.streamVideo(key, range, folder);
  }
}
