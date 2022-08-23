/// <reference types="node" />
import fs from "fs-extra";
import { ST_S3Options, ST_FileDataObj, ST_SaveFileResponse } from "../../../types";
import Store from ".";
export default class S3Store extends Store {
    constructor(options: ST_S3Options);
    save(key: string, data: ST_FileDataObj, folder?: string): Promise<ST_SaveFileResponse>;
    get(key: string, folder?: string): void;
    delete(key: string, folder?: string): void;
    stream(key: string, folder?: string): fs.ReadStream;
}
//# sourceMappingURL=s3.d.ts.map