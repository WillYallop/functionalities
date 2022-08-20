//
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
// Classes
import Image from "../singles/image";
// Types
import { IK_processConfig, IK_data } from "../../types";

export default class ImageKit {
  config: IK_processConfig;
  injestedImages: Map<string, Image>;
  constructor(config?: IK_processConfig) {
    // default config
    const defaultConfig: IK_processConfig = {
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
    this.config = { ...defaultConfig, ...config };
    this.injestedImages = new Map();
  }

  // --------------------------------------------------
  // public
  // --------------------------------------------------
  // Inject and return new Image instance
  async injest(input: Buffer, name?: string) {
    const imageData: IK_data = {
      key: uuidv4(),
      width: 0,
      height: 0,
      name: "",
      images: undefined,
    };

    // injest image into sharp
    const image = sharp(input);

    // update image data obj
    const metadata = await image.metadata();

    imageData.width = metadata.width || 0;
    imageData.height = metadata.height || 0;
    imageData.name = name || "";

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
        data: input,
        mime: imageMimes[target],
      };
    };
    imageData.images = {
      jpeg: imagesTypeData("jpeg"),
      png: imagesTypeData("png"),
      webp: imagesTypeData("webp"),
      avif: imagesTypeData("avif"),
      svg: imagesTypeData("svg"),
      gif: imagesTypeData("gif"),
    };

    const ImageInst = new Image(imageData, image);
    this.injestedImages.set(imageData.key, ImageInst);
    return ImageInst;
  }
  async close() {
    this.injestedImages.clear();
  }

  //
  get images(): Map<string, Image> {
    return this.injestedImages;
  }
}
