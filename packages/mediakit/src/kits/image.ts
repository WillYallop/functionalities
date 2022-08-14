//
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
// Types
import {
  IK_processConfig,
  IK_processDefaultConfig,
  IK_data,
} from "../../types";

export default class ImageKit {
  input: Buffer;
  config: IK_processDefaultConfig;
  imageData: IK_data;
  image: sharp.Sharp;
  constructor(
    input: Buffer,
    config: {
      name?: string;
      injested?: () => void;
    }
  ) {
    this.input = input;
    // default config
    this.config = {
      width: undefined,
      height: undefined,
      fit: "cover",
      position: "center",
      formats: {
        jpeg: {
          quality: 80,
        },
        png: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
        avif: {
          quality: 80,
        },
        svg: {
          quality: 80,
        },
      },
    };

    // data
    this.imageData = {
      key: uuidv4(),
      width: 0,
      height: 0,
      name: config?.name || "",
      images: undefined,
    };

    // injest image into sharp
    this.image = sharp(this.input);
    // update image data obj
    this.image.metadata().then((metadata) => {
      this.imageData.width = metadata.width || 0;
      this.imageData.height = metadata.height || 0;
      this.#setImageData(metadata);
      if (config.injested) config.injested();
    });
  }
  // --------------------------------------------------
  // internal
  // --------------------------------------------------
  async #setImageData(metadata: sharp.Metadata) {
    const imageMimes = {
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      avif: "image/avif",
      svg: "image/svg+xml",
      gif: "image/gif",
    };

    const imagesTypeData = (
      target: "jpeg" | "png" | "webp" | "avif" | "svg" | "gif"
    ) => {
      if (!metadata.format) return undefined;
      if (target !== metadata.format) return undefined;
      return {
        data: this.input,
        mime: imageMimes[target],
      };
    };
    this.imageData.images = {
      jpeg: imagesTypeData("jpeg"),
      png: imagesTypeData("png"),
      webp: imagesTypeData("webp"),
      avif: imagesTypeData("avif"),
      svg: imagesTypeData("svg"),
      gif: imagesTypeData("gif"),
    };
  }

  // --------------------------------------------------
  // public
  // --------------------------------------------------
  // Handle resizing the image & converting it to a different format
  async process(config?: IK_processConfig) {
    this.config = { ...this.config, ...config };
  }

  // --------------------------------------------------
  //
  // --------------------------------------------------
  get key() {
    return this.data.key;
  }
  get data() {
    return this.imageData;
  }
}
