import Video from "./video";
import { VK_ProcessConfig, VK_VideoMap } from "../../types";
export default class VideoKit {
    config: VK_ProcessConfig;
    injestedVideos: VK_VideoMap;
    constructor(config?: VK_ProcessConfig);
    injest(location: string, mimetype: string, name?: string): Promise<Video>;
    close(): Promise<void>;
    get videos(): VK_VideoMap;
}
//# sourceMappingURL=kit.d.ts.map