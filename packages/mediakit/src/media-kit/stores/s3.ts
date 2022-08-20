// Types
import { ST_S3Options, ST_fileDataObj } from "../../../types";
// Class
import Store from ".";

export default class S3Store extends Store {
  constructor(options: ST_S3Options, keyPrefix: string) {
    super({
      keyPrefix: keyPrefix,
    });
  }
  save(key: string, data: ST_fileDataObj) {}
}
