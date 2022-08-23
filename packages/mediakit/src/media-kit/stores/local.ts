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
  async save(
    key: string,
    data: ST_FileDataObj,
    folder?: string
  ): Promise<ST_SaveFileResponse> {
    try {
      // build the directory if it doesn't exist
      this.#buildDirectories(folder);
      // save the file
      const filePath = path.join(
        this.localOptions.directory,
        folder || "",
        this.fileKey(key, data.extension)
      );
      await fs.writeFile(filePath, data.data);
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
  get(key: string, folder?: string) {
    try {
      const filePath = path.join(
        this.localOptions.directory,
        folder || "",
        key
      );
      return fs.readFileSync(filePath);
    } catch (err) {
      return null;
    }
  }
  delete(key: string, folder?: string) {
    try {
      const filePath = path.join(
        this.localOptions.directory,
        folder || "",
        key
      );
      fs.unlinkSync(filePath);
      return {
        deleted: true,
      };
    } catch (err) {
      return {
        deleted: false,
      };
    }
  }
  stream(key: string, folder?: string) {
    try {
      const filePath = path.join(
        this.localOptions.directory,
        folder || "",
        key
      );
      return fs.createReadStream(filePath);
    } catch (err) {
      return null;
    }
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
