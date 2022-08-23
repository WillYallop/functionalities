import sharp from "sharp";
import { IK_Data } from "../../types";
export default class Image {
  image: sharp.Sharp;
  imageData: IK_Data;
  constructor(data: IK_Data, image: sharp.Sharp);
  process(): Promise<{
    data: string;
  }>;
  get data(): IK_Data;
}
//# sourceMappingURL=image.d.ts.map
