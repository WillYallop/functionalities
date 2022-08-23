/// <reference types="node" />
import sharp from "sharp";
import { IK_Data, IK_ProcessConfig } from "../../types";
export default class Image {
    #private;
    image: sharp.Sharp;
    imageData: IK_Data;
    config: IK_ProcessConfig;
    constructor(config: IK_ProcessConfig, input: Buffer, name?: string);
    process(): Promise<{
        complete: boolean;
        time: number;
    }>;
    get data(): IK_Data;
    get key(): string;
}
//# sourceMappingURL=image.d.ts.map