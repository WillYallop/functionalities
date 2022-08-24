/// <reference types="node" />
/// <reference types="node" />
import { MK_Options, MK_OptionsParam, MK_SaveSingleFileRes } from "../../types";
import ImageKit from "../image-kit/kit";
import VideoKit from "../video-kit/kit";
import S3Store from "./stores/s3";
import LocalStore from "./stores/local";
export default class MediaKit {
    options: MK_Options;
    store: S3Store | LocalStore;
    constructor(options: MK_OptionsParam);
    save(media: ImageKit | VideoKit, folder?: string): Promise<MK_SaveSingleFileRes[]>;
    delete(key: string, folder?: string): Promise<{
        deleted: boolean;
    }>;
    get(key: string, folder?: string): Promise<Buffer | null>;
    stream(key: string, folder?: string): import("stream").Readable | null;
}
//# sourceMappingURL=kit.d.ts.map