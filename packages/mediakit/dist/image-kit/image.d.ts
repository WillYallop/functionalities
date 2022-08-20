/// <reference types="node" />
import sharp from "sharp";
import { IK_data, IK_processConfig } from "../../types";
export default class Image {
    #private;
    image: sharp.Sharp;
    imageData: IK_data;
    config: IK_processConfig;
    constructor(config: IK_processConfig, input: Buffer, name?: string);
    process(): Promise<{
        complete: boolean;
        time: number;
    }>;
    get data(): IK_data;
    get key(): string;
}
//# sourceMappingURL=image.d.ts.map