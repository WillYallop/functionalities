import sharp from "sharp";
import { IK_data } from "../../types";
export default class Image {
    image: sharp.Sharp;
    imageData: IK_data;
    constructor(data: IK_data, image: sharp.Sharp);
    process(): Promise<{
        data: string;
    }>;
    get data(): IK_data;
}
//# sourceMappingURL=image.d.ts.map