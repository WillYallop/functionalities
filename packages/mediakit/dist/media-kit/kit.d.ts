/// <reference types="node" />
import { MK_Options, MK_OptionsParam } from "../../types";
import { ReadStream } from "fs";
import ImageKit from "../image-kit/kit";
import VideoKit from "../video-kit/kit";
import S3Store from "./stores/s3";
import LocalStore from "./stores/local";
export default class MediaKit {
    options: MK_Options;
    store: S3Store | LocalStore;
    constructor(options: MK_OptionsParam);
    save(media: ImageKit | VideoKit, folder?: string): {
        success: boolean;
    };
    delete(key: string): void;
    get(key: string, folder?: string): void;
    stream(key: string, folder?: string): ReadStream;
}
//# sourceMappingURL=kit.d.ts.map