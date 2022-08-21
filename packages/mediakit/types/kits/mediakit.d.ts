// config options
import { ST_S3Options, ST_LocalOptions } from "../../types";

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
