import fs from "fs-extra";
import path from "path";
// Types
import { ST_S3Options, ST_fileDataObj } from "../../../types";
// Class
import Store from ".";

export default class S3Store extends Store {
  constructor(options: ST_S3Options) {
    super();
  }
  save(key: string, data: ST_fileDataObj) {}
  get(key: string, folder?: string) {}
  delete(key: string) {}
  stream(key: string, folder?: string) {
    const filePath = path.join("./uploads", folder || "", key);
    return fs.createReadStream(filePath);
  }
}
