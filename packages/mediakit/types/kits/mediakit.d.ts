// config options
import {
  ST_S3Options,
  ST_LocalOptions,
  ST_SaveFileResponse,
} from "../../types";

export interface MK_OptionsParam {
  storeMethod: "local" | "s3";
  s3Options?: ST_S3Options;
  localOptions?: ST_LocalOptions;
}
export interface MK_Options {
  storeMethod: "local" | "s3";
  s3Options: ST_S3Options;
  localOptions: ST_LocalOptions;
}

export interface MK_SaveSingleFileRes {
  success: boolean;
  key: string;
  name: string;
  height?: number;
  width?: number;
  folder?: string;
  files: Array<ST_SaveFileResponse>;
}
