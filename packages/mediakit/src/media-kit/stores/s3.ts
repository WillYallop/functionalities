// Types
import { ST_S3Options, ST_fileDataObj } from "../../../types";
// Class
import Store from ".";

export default class S3Store extends Store {
  constructor(options: ST_S3Options) {
    super();
  }
  save(key: string, data: Array<ST_fileDataObj>) {}
}
