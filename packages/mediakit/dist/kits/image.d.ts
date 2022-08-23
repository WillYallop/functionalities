/// <reference types="node" />
import Image from "../singles/image";
import { IK_ProcessConfig } from "../../types";
export default class ImageKit {
  config: IK_ProcessConfig;
  injestedImages: Map<string, Image>;
  constructor(config?: IK_ProcessConfig);
  injest(input: Buffer, name?: string): Promise<Image>;
  close(): Promise<void>;
  get images(): Map<string, Image>;
}
//# sourceMappingURL=image.d.ts.map
