// Types
import { IK_processConfig, IK_processDefaultConfig } from "../../types";

export default class ImageKit {
  input: Buffer;
  config: IK_processDefaultConfig;
  constructor(input: Buffer, config?: IK_processConfig) {
    this.input = input;
    // set config
    const defaultConfig: IK_processDefaultConfig = {
      width: undefined,
      height: undefined,
      fit: "cover",
      position: "center",
      formats: {
        jpeg: {
          convert: true,
          quality: 100,
        },
        png: {
          convert: true,
          quality: 100,
        },
        webp: {
          convert: true,
          quality: 100,
        },
        avif: {
          convert: true,
          quality: 100,
        },
      },
    };
    this.config = { ...defaultConfig, ...config };
  }
  // Handle resizing the image & converting it to a different format
  async process() {
    console.log("");
  }
}
