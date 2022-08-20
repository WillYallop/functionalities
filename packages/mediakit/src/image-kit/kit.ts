// Classes
import Image from "./image";
// Types
import { IK_processConfig, IK_ImageMap } from "../../types";

export default class ImageKit {
  config: IK_processConfig;
  injestedImages: IK_ImageMap;
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
    const ImageInst = new Image(this.config, input, name);
    this.injestedImages.set(ImageInst.key, ImageInst);
    return ImageInst;
  }
  // clear all injested images
  async close() {
    this.injestedImages.clear();
  }

  // get all injested images
  get images(): Map<string, Image> {
    return this.injestedImages;
  }
}
