import fs from "fs-extra";
import path from "path";
// Types
import { ST_LocalOptions, ST_fileDataObj } from "../../../types";
// Class
import Store from ".";

export default class LocalStore extends Store {
  localOptions: ST_LocalOptions;
  constructor(options: ST_LocalOptions) {
    super();
    this.localOptions = options;
  }

  // ------------------------------------------------------------
  // public methods
  // ------------------------------------------------------------

  // save files to local directory
  save(key: string, data: ST_fileDataObj, folder?: string) {
    // build the directory if it doesn't exist
    this.#buildDirectories(folder);
    // save the file
    const filePath = path.join(
      this.localOptions.directory,
      folder || "",
      this.fileKey(key, data.extension)
    );
    fs.writeFileSync(filePath, data.data);
  }
  get(key: string, folder?: string) {
    const filePath = path.join(this.localOptions.directory, folder || "", key);
    return fs.readFileSync(filePath);
  }
  delete(key: string, folder?: string) {
    const filePath = path.join(this.localOptions.directory, folder || "", key);
    fs.unlinkSync(filePath);
    return {
      deleted: true,
    };
  }
  stream(key: string, folder?: string) {
    const filePath = path.join(this.localOptions.directory, folder || "", key);
    console.log("LOCAL STORE");
    return fs.createReadStream(filePath);
  }

  // ------------------------------------------------------------
  // private methods
  // ------------------------------------------------------------

  // Build the directory structure for the file to be saved
  #buildDirectories(folder?: string) {
    // create directory if it doesn't exist
    const dir = path.join(this.localOptions.directory, folder || "");
    if (!fs.existsSync(dir))
      fs.mkdirSync(dir, {
        recursive: true,
      });
  }
}
