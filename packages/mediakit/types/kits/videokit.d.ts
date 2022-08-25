import Video from "../../src/video-kit/video";

export interface VK_ProcessConfig {
  keyPrefix?: string;
}

export interface VK_VideoData {
  key: string;
  name: string;
  temp_location: string;
  mimetype: string;
  extension: string;
}

export type VK_VideoMap = Map<string, Video>;
