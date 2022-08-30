import { ReadStream } from "fs-extra";
import { Readable } from "stream";
// Types
import {
  ST_FileDataObj,
  VK_VideoData,
  ST_SaveFileResponse,
} from "../../../types";

// function types
type ST_SaveFunction = (
  key: string,
  data: ST_FileDataObj,
  folder?: string
) => void;
type ST_SaveVideoFunction = (
  key: string,
  data: VK_VideoData,
  folder?: string
) => void;
type ST_GetFunction = (key: string, folder?: string) => Promise<Buffer>;
type ST_DeleteFunction = (key: string, folder?: string) => void;
type ST_StreamFunction = (
  key: string,
  folder?: string
) => ReadStream | Readable | null;
type ST_StreamVideoFunction = (
  key: string,
  range: string,
  folder?: string
) => {
  stream: ReadStream | Readable | null;
  headers: {
    "Content-Range": string;
    "Accept-Ranges": string;
    "Content-Length": number;
    "Content-Type": string;
  };
};

const CHUNK_SIZE = 10 ** 6;

export default class Store {
  constructor() {}
  fileKey(key: string, ext: string) {
    return `${key}.${ext}`;
  }
  streamRange(range: string, videoSize: number) {
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    return {
      start,
      end,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      },
    };
  }

  // Images and file
  async saveWrapper(
    key: string,
    data: ST_FileDataObj,
    saveFunction: ST_SaveFunction,
    folder?: string
  ): Promise<ST_SaveFileResponse> {
    try {
      saveFunction(key, data, folder);
      return {
        saved: true,
        key: this.fileKey(key, data.extension),
        mime: data.mime,
        extension: data.extension,
      };
    } catch (err) {
      console.log(err);
      return {
        saved: false,
        key: this.fileKey(key, data.extension),
        mime: data.mime,
        extension: data.extension,
      };
    }
  }
  async getWrapper(key: string, getFunction: ST_GetFunction, folder?: string) {
    try {
      return await getFunction(key, folder);
    } catch (err) {
      return null;
    }
  }
  async deleteWrapper(
    key: string,
    deleteFunction: ST_DeleteFunction,
    folder?: string
  ) {
    try {
      deleteFunction(key, folder);
      return {
        deleted: true,
      };
    } catch (err) {
      return {
        deleted: false,
      };
    }
  }
  streamWrapper(
    key: string,
    streamFunction: ST_StreamFunction,
    folder?: string
  ) {
    try {
      return streamFunction(key, folder);
    } catch (err) {
      return null;
    }
  }

  // Videos
  async saveVideoWrapper(
    key: string,
    data: VK_VideoData,
    saveFunction: ST_SaveVideoFunction,
    folder?: string
  ): Promise<ST_SaveFileResponse> {
    try {
      await saveFunction(key, data, folder);
      return {
        saved: true,
        key: this.fileKey(key, data.extension),
        mime: data.mimetype,
        extension: data.extension,
      };
    } catch (err) {
      console.log(err);
      return {
        saved: false,
        key: this.fileKey(key, data.extension),
        mime: data.mimetype,
        extension: data.extension,
      };
    }
  }
  streamVideoWrapper(
    key: string,
    range: string,
    streamFunction: ST_StreamVideoFunction,
    folder?: string
  ) {
    try {
      return streamFunction(key, range, folder);
    } catch (err) {
      return null;
    }
  }
}
