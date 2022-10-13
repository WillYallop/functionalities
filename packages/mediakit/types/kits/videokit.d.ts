import Video from "../../dist/video-kit/video";

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

export interface MK_SaveSingleVideoRes {
  success: boolean;
  key: string;
  name: string;
  mime: string;
  extension: string;
}
