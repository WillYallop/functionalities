/// <reference types="node" />
import Image from "./image";
import { IK_ProcessConfig, IK_ImageMap } from "../../types";
export default class ImageKit {
    config: IK_ProcessConfig;
    injestedImages: IK_ImageMap;
    constructor(config?: IK_ProcessConfig);
    injest(input: Buffer, name?: string): Promise<Image>;
    close(): Promise<void>;
    get images(): IK_ImageMap;
}
//# sourceMappingURL=kit.d.ts.map