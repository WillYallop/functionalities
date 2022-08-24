import fs from "fs-extra";
import path from "path";
// Types
import {
  ST_LocalOptions,
  ST_FileDataObj,
  ST_SaveFileResponse,
} from "../../../types";
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
  save(key: string, data: ST_FileDataObj, folder?: string) {
    // save function
    const saveFunction = async (
      key: string,
      data: ST_FileDataObj,
      folder?: string
    ) => {
      // build the directory if it doesn't exist
      this.#buildDirectories(folder);
      // save the file
      const filePath = path.join(
        this.localOptions.directory,
        folder || "",
        this.fileKey(key, data.extension)
      );
      await fs.writeFile(filePath, data.data);
    };
    // return save wrapper res
    return this.saveWrapper(key, data, saveFunction, folder);
  }
  get(key: string, folder?: string) {
    // get function
    const getFunction = async (key: string, folder?: string) => {
      const filePath = path.join(
        this.localOptions.directory,
        folder || "",
        key
      );
      return await fs.readFile(filePath);
    };
    // return get wrapper res
    return this.getWrapper(key, getFunction, folder);
  }
  delete(key: string, folder?: string) {
    // delete function
    const deleteFunction = (key: string, folder?: string) => {
      // check if file exists
      if (fs.existsSync(this.#filePath(key, folder))) {
        // delete the file
        fs.unlinkSync(this.#filePath(key, folder));
      }
    };
    // return delete wrapper res
    return this.deleteWrapper(key, deleteFunction, folder);
  }
  stream(key: string, folder?: string) {
    // stream function
    const streamFunction = (key: string, folder?: string) => {
      return fs.createReadStream(this.#filePath(key, folder));
    };
    // return stream wrapper res
    return this.streamWrapper(key, streamFunction, folder);
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
  // get file path
  #filePath(key: string, folder?: string) {
    return path.join(this.localOptions.directory, folder || "", key);
  }
}
