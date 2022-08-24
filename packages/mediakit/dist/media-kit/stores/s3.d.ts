/// <reference types="node" />
/// <reference types="node" />
import AWS from "aws-sdk";
import { ST_S3Options, ST_FileDataObj, ST_SaveFileResponse } from "../../../types";
import Store from ".";
export default class S3Store extends Store {
    #private;
    client: AWS.S3;
    options: ST_S3Options;
    constructor(options: ST_S3Options);
    save(key: string, data: ST_FileDataObj, folder?: string): Promise<ST_SaveFileResponse>;
    get(key: string, folder?: string): Promise<Buffer | null>;
    delete(key: string, folder?: string): Promise<{
        deleted: boolean;
    }>;
    stream(key: string, folder?: string): import("stream").Readable | null;
}
//# sourceMappingURL=s3.d.ts.map