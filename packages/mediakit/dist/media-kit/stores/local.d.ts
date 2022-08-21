/// <reference types="node" />
/// <reference types="node" />
import fs from "fs-extra";
import { ST_LocalOptions, ST_fileDataObj } from "../../../types";
import Store from ".";
export default class LocalStore extends Store {
    #private;
    localOptions: ST_LocalOptions;
    constructor(options: ST_LocalOptions);
    save(key: string, data: ST_fileDataObj, folder?: string): void;
    get(key: string, folder?: string): Buffer;
    delete(key: string, folder?: string): {
        deleted: boolean;
    };
    stream(key: string, folder?: string): fs.ReadStream;
}
//# sourceMappingURL=local.d.ts.map