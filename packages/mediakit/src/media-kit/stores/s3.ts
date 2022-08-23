import fs from "fs-extra";
import path from "path";
// Types
import {
  ST_S3Options,
  ST_FileDataObj,
  ST_SaveFileResponse,
} from "../../../types";
// Class
import Store from ".";

export default class S3Store extends Store {
  constructor(options: ST_S3Options) {
    super();
  }
  async save(
    key: string,
    data: ST_FileDataObj,
    folder?: string
  ): Promise<ST_SaveFileResponse> {
    return {
      saved: true,
      key: this.fileKey(key, data.extension),
      mime: data.mime,
      extension: data.extension,
    };
  }
  get(key: string, folder?: string) {}
  delete(key: string, folder?: string) {}
  stream(key: string, folder?: string) {
    const filePath = path.join("./uploads", folder || "", key);
    return fs.createReadStream(filePath);
  }
}
