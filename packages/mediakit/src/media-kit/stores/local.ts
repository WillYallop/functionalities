// Types
import { ST_LocalOptions, ST_fileDataObj } from "../../../types";
// Class
import Store from ".";

export default class LocalStore extends Store {
  constructor(options: ST_LocalOptions) {
    super();
  }
  save(key: string, data: Array<ST_fileDataObj>) {}
}
