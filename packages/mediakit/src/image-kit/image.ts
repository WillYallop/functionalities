import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
// types
import { IK_data, IK_processConfig } from "../../types";

const imageMimes = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  svg: "image/svg+xml",
  gif: "image/gif",
};

export default class Image {
  image: sharp.Sharp;
  imageData: IK_data;
  config: IK_processConfig;
  constructor(config: IK_processConfig, input: Buffer, name?: string) {
    this.config = config;

    this.imageData = {
      key: uuidv4(),
      width: 0,
      height: 0,
      name: "",
      images: [],
    };

    // injest image into sharp
    this.image = sharp(input);

    // update image data obj
    this.image.metadata().then((metadata) => {
      this.imageData.width = metadata.width || 0;
      this.imageData.height = metadata.height || 0;
      this.imageData.originalFormat = metadata.format || "";
      this.imageData.name = name || "";
      this.imageData.hasAlpha = metadata.hasAlpha || false;
    });
  }

  // internal
  async #converToJPEG() {
    const buffer = await this.image
      .jpeg({
        mozjpeg: true,
        quality: this.config.formats?.jpeg?.quality || 80,
      })
      .toBuffer();
    this.imageData.images.push({
      data: buffer,
      mime: imageMimes.jpeg,
      extension: "jpeg",
    });
  }
  async #convertToPNG() {
    const buffer = await this.image
      .png({
        quality: this.config.formats?.png?.quality || 80,
      })
      .toBuffer();
    this.imageData.images.push({
      data: buffer,
      mime: imageMimes.png,
      extension: "png",
    });
  }
  async #convertToWEBP() {
    const buffer = await this.image
      .webp({
        quality: this.config.formats?.webp?.quality || 80,
      })
      .toBuffer();
    this.imageData.images.push({
      data: buffer,
      mime: imageMimes.webp,
      extension: "webp",
    });
  }
  async #convertToAVIF() {
    const buffer = await this.image.avif().toBuffer();
    this.imageData.images.push({
      data: buffer,
      mime: imageMimes.avif,
      extension: "avif",
    });
  }

  async #optimiseGIF() {
    // store buffer in image data
    const buffer = await this.image.toBuffer();
    this.imageData.images.push({
      data: buffer,
      mime: imageMimes.gif,
      extension: "gif",
    });
  }
  async #optimiseSVG() {
    const buffer = await this.image.toBuffer();
    this.imageData.images.push({
      data: buffer,
      mime: imageMimes.svg,
      extension: "svg",
    });
  }

  // external
  async process() {
    const start = Date.now();
    // rotate image to match exif orientation
    this.image.rotate();
    // if we need to resize
    if (this.config.width || this.config.height) {
      this.image.resize(
        this.config.width || this.imageData.width,
        this.config.height || this.imageData.height,
        {
          fit: this.config.fit,
          position: this.config.position,
        }
      );
    }

    // convert and optimise

    // only optimise gif - dont convert to other formats
    if (this.imageData.originalFormat === "gif") {
      await this.#optimiseGIF();
      return {
        complete: true,
        time: Date.now() - start,
      };
    }
    // only optimise svgs - dont convert to other formats
    else if (this.imageData.originalFormat === "svg") {
      await this.#optimiseSVG();
      return {
        complete: true,
        time: Date.now() - start,
      };
    }
    // convert to webp and avif, depending on if we have alpha levels or not generate a png or jpeg
    else {
      if (this.imageData.hasAlpha) await this.#convertToPNG();
      else await this.#converToJPEG();
      await this.#convertToWEBP();
      await this.#convertToAVIF();
      return {
        complete: true,
        time: Date.now() - start,
      };
    }
  }

  get data(): IK_data {
    return this.imageData;
  }
  get key(): string {
    return this.imageData.key;
  }
}
