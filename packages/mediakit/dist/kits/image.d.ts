/// <reference types="node" />
import { IK_processConfig, IK_processDefaultConfig } from "../../types";
export default class ImageKit {
    input: Buffer;
    config: IK_processDefaultConfig;
    constructor(input: Buffer, config?: IK_processConfig);
    process(): Promise<void>;
}
//# sourceMappingURL=image.d.ts.map