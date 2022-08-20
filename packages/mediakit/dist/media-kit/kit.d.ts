import { MK_Options, MK_OptionsParam } from "../../types";
import ImageKit from "../image-kit/kit";
import VideoKit from "../video-kit/kit";
import S3Store from "./stores/s3";
import LocalStore from "./stores/local";
export default class MediaKit {
    options: MK_Options;
    store: S3Store | LocalStore;
    constructor(options: MK_OptionsParam);
    save(media: ImageKit | VideoKit): {
        success: Map<string, import("../image-kit/image").default>;
    } | undefined;
    delete(id: string): void;
    get(id: string): void;
    stream(id: string): void;
}
//# sourceMappingURL=kit.d.ts.map