import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
// types
import { VK_ProcessConfig, VK_VideoData } from "../../types";

export default class Video {
  config: VK_ProcessConfig;
  videoData: VK_VideoData;
  constructor(
    config: VK_ProcessConfig,
    location: string,
    mimetype: string,
    name?: string
  ) {
    this.config = config;
    this.videoData = {
      key: `${this.config.keyPrefix}${uuidv4()}`,
      name: name || "",
      temp_location: location,
      mimetype: mimetype,
      extension: mime.extension(mimetype) || "",
    };
  }

  get data() {
    return this.videoData;
  }
  get key(): string {
    return this.videoData.key;
  }
}
