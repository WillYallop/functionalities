/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { ReadStream } from "fs-extra";
import { Readable } from "stream";
import { ST_FileDataObj, ST_SaveFileResponse } from "../../../types";
declare type ST_SaveFunction = (key: string, data: ST_FileDataObj, folder?: string) => void;
declare type ST_GetFunction = (key: string, folder?: string) => Promise<Buffer>;
declare type ST_DeleteFunction = (key: string, folder?: string) => void;
declare type ST_StreamFunction = (key: string, folder?: string) => ReadStream | Readable | null;
export default class Store {
    constructor();
    fileKey(key: string, ext: string): string;
    saveWrapper(key: string, data: ST_FileDataObj, saveFunction: ST_SaveFunction, folder?: string): Promise<ST_SaveFileResponse>;
    getWrapper(key: string, getFunction: ST_GetFunction, folder?: string): Promise<Buffer | null>;
    deleteWrapper(key: string, deleteFunction: ST_DeleteFunction, folder?: string): Promise<{
        deleted: boolean;
    }>;
    streamWrapper(key: string, streamFunction: ST_StreamFunction, folder?: string): Readable | null;
}
export {};
//# sourceMappingURL=index.d.ts.map