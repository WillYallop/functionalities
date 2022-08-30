/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { ReadStream } from "fs-extra";
import { Readable } from "stream";
import { ST_FileDataObj, VK_VideoData, ST_SaveFileResponse } from "../../../types";
declare type ST_SaveFunction = (key: string, data: ST_FileDataObj, folder?: string) => void;
declare type ST_SaveVideoFunction = (key: string, data: VK_VideoData, folder?: string) => void;
declare type ST_GetFunction = (key: string, folder?: string) => Promise<Buffer>;
declare type ST_DeleteFunction = (key: string, folder?: string) => void;
declare type ST_StreamFunction = (key: string, folder?: string) => ReadStream | Readable | null;
declare type ST_StreamVideoFunction = (key: string, range: string, folder?: string) => {
    stream: ReadStream | Readable | null;
    headers: {
        "Content-Range": string;
        "Accept-Ranges": string;
        "Content-Length": number;
        "Content-Type": string;
    };
};
export default class Store {
    constructor();
    fileKey(key: string, ext: string): string;
    streamRange(range: string, videoSize: number): {
        start: number;
        end: number;
        headers: {
            "Content-Range": string;
            "Accept-Ranges": string;
            "Content-Length": number;
            "Content-Type": string;
        };
    };
    saveWrapper(key: string, data: ST_FileDataObj, saveFunction: ST_SaveFunction, folder?: string): Promise<ST_SaveFileResponse>;
    getWrapper(key: string, getFunction: ST_GetFunction, folder?: string): Promise<Buffer | null>;
    deleteWrapper(key: string, deleteFunction: ST_DeleteFunction, folder?: string): Promise<{
        deleted: boolean;
    }>;
    streamWrapper(key: string, streamFunction: ST_StreamFunction, folder?: string): Readable | null;
    saveVideoWrapper(key: string, data: VK_VideoData, saveFunction: ST_SaveVideoFunction, folder?: string): Promise<ST_SaveFileResponse>;
    streamVideoWrapper(key: string, range: string, streamFunction: ST_StreamVideoFunction, folder?: string): {
        stream: Readable | ReadStream | null;
        headers: {
            "Content-Range": string;
            "Accept-Ranges": string;
            "Content-Length": number;
            "Content-Type": string;
        };
    } | null;
}
export {};
//# sourceMappingURL=index.d.ts.map