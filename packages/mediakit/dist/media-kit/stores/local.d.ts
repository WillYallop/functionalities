/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import fs from "fs-extra";
import { ST_LocalOptions, ST_FileDataObj, VK_VideoData } from "../../../types";
import Store from ".";
export default class LocalStore extends Store {
    #private;
    localOptions: ST_LocalOptions;
    constructor(options: ST_LocalOptions);
    save(key: string, data: ST_FileDataObj, folder?: string): Promise<import("../../../types").ST_SaveFileResponse>;
    get(key: string, folder?: string): Promise<Buffer | null>;
    delete(key: string, folder?: string): Promise<{
        deleted: boolean;
    }>;
    stream(key: string, folder?: string): import("stream").Readable | null;
    saveVideo(key: string, data: VK_VideoData, folder?: string): Promise<import("../../../types").ST_SaveFileResponse>;
    streamVideo(key: string, range: string, folder?: string): Promise<{
        stream: import("stream").Readable | fs.ReadStream | null;
        headers: {
            "Content-Range": string;
            "Accept-Ranges": string;
            "Content-Length": number;
            "Content-Type": string;
        };
    } | null>;
}
//# sourceMappingURL=local.d.ts.map