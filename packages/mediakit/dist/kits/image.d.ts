/// <reference types="node" />
import sharp from "sharp";
import { IK_processConfig, IK_processDefaultConfig, IK_data } from "../../types";
export default class ImageKit {
    #private;
    input: Buffer;
    config: IK_processDefaultConfig;
    imageData: IK_data;
    image: sharp.Sharp;
    constructor(input: Buffer, config: {
        name?: string;
        injested?: () => void;
    });
    process(config?: IK_processConfig): Promise<void>;
    get key(): string;
    get data(): IK_data;
}
//# sourceMappingURL=image.d.ts.map