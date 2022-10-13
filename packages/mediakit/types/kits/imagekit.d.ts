import { FitEnum } from "sharp";
import Image from "../../dist/image-kit/image";
import { ST_FileDataObj } from "../index";

export interface IK_ProcessConfig {
  keyPrefix?: string;
  width?: number;
  height?: number;
  fit?: keyof FitEnum;
  position?: "center" | "top" | "bottom" | "left" | "right" | string;
  formats?: {
    jpeg?: {
      quality?: number;
    };
    png?: {
      quality?: number;
    };
    webp?: {
      quality?: number;
    };
    avif?: {
      quality?: number;
    };
    svg?: {
      quality?: number;
    };
    gif?: {
      quality?: number;
    };
  };
}

export interface IK_Data {
  key: string;
  width: number;
  height: number;
  name: string;
  originalFormat?: string;
  hasAlpha?: boolean;
  images: Array<ST_FileDataObj>;
}

export type IK_ImageMap = Map<string, Image>;
