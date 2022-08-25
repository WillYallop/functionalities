import Video from "./video";
// Types
import { VK_ProcessConfig, VK_VideoMap } from "../../types";

export default class VideoKit {
  config: VK_ProcessConfig;
  injestedVideos: VK_VideoMap;
  constructor(config?: VK_ProcessConfig) {
    // default config
    const defaultConfig: VK_ProcessConfig = {
      keyPrefix: "",
    };
    this.config = { ...defaultConfig, ...config };
    this.injestedVideos = new Map();
  }

  // --------------------------------------------------
  // public
  // --------------------------------------------------
  // Injest and return new Image instance
  async injest(location: string, mimetype: string, name?: string) {
    const VideoInst = new Video(this.config, location, mimetype, name);
    this.injestedVideos.set(VideoInst.key, VideoInst);
    return VideoInst;
  }
  // clear all injested images
  async close() {
    this.injestedVideos.clear();
  }

  // get all injested images
  get videos(): VK_VideoMap {
    return this.injestedVideos;
  }
}
