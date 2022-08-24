/// <reference types="node" />
/// <reference types="node" />
import { ST_LocalOptions, ST_FileDataObj, ST_SaveFileResponse } from "../../../types";
import Store from ".";
export default class LocalStore extends Store {
    #private;
    localOptions: ST_LocalOptions;
    constructor(options: ST_LocalOptions);
    save(key: string, data: ST_FileDataObj, folder?: string): Promise<ST_SaveFileResponse>;
    get(key: string, folder?: string): Promise<Buffer | null>;
    delete(key: string, folder?: string): Promise<{
        deleted: boolean;
    }>;
    stream(key: string, folder?: string): import("stream").Readable | null;
}
//# sourceMappingURL=local.d.ts.map