/// <reference types="node" />
import Image from "./image";
import { IK_processConfig } from "../../types";
export default class ImageKit {
    config: IK_processConfig;
    injestedImages: Map<string, Image>;
    constructor(config?: IK_processConfig);
    injest(input: Buffer, name?: string): Promise<Image>;
    close(): Promise<void>;
    get images(): Map<string, Image>;
}
//# sourceMappingURL=kit.d.ts.map