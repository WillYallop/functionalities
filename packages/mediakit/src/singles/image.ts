import sharp from "sharp";
// types
import { IK_data } from "../../types";

export default class Image {
  image: sharp.Sharp;
  imageData: IK_data;
  constructor(data: IK_data, image: sharp.Sharp) {
    this.imageData = data;
    this.image = image;
  }
  async process() {
    return {
      data: "data",
    };
  }

  get data(): IK_data {
    return this.imageData;
  }
}
