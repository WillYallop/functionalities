import { VK_ProcessConfig, VK_VideoData } from "../../types";
export default class Video {
    config: VK_ProcessConfig;
    videoData: VK_VideoData;
    constructor(config: VK_ProcessConfig, location: string, mimetype: string, name?: string);
    get data(): VK_VideoData;
    get key(): string;
}
//# sourceMappingURL=video.d.ts.map