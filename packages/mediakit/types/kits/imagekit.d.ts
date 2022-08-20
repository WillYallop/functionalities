import { FitEnum } from "sharp";

export interface IK_processConfig {
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

export interface IK_data {
  key: string;
  width: number;
  height: number;
  name: string;
  originalFormat?: string;
  hasAlpha?: boolean;
  images: {
    jpeg?: {
      data: Buffer;
      mime: string;
    };
    png?: {
      data: Buffer;
      mime: string;
    };
    webp?: {
      data: Buffer;
      mime: string;
    };
    avif?: {
      data: Buffer;
      mime: string;
    };
    svg?: {
      data: Buffer;
      mime: string;
    };
    gif?: {
      data: Buffer;
      mime: string;
    };
  };
}
