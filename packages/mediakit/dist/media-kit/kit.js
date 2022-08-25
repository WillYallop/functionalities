"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kit_1 = __importDefault(require("../image-kit/kit"));
const kit_2 = __importDefault(require("../video-kit/kit"));
const s3_1 = __importDefault(require("./stores/s3"));
const local_1 = __importDefault(require("./stores/local"));
const flatten_images_1 = __importDefault(require("../image-kit/util/flatten-images"));
const path_1 = __importDefault(require("path"));
class MediaKit {
    options;
    store;
    constructor(options) {
        const defaultOptions = {
            storeMethod: "local",
            s3Options: {
                accessKeyId: "",
                secretAccessKey: "",
                region: "",
                bucket: "",
            },
            localOptions: {
                directory: path_1.default.resolve("/media"),
            },
        };
        this.options = { ...defaultOptions, ...options };
        switch (this.options.storeMethod) {
            case "s3":
                this.store = new s3_1.default(this.options.s3Options);
                break;
            case "local":
                this.store = new local_1.default(this.options.localOptions);
                break;
            default:
                throw new Error("Invalid store method");
        }
    }
    async save(media, folder) {
        const savedFiles = new Map();
        if (media instanceof kit_1.default) {
            const flatData = (0, flatten_images_1.default)(media.images);
            for (let i = 0; i < flatData.length; i++) {
                if (!savedFiles.has(flatData[i].key)) {
                    savedFiles.set(flatData[i].key, {
                        success: true,
                        key: flatData[i].key,
                        name: flatData[i].name,
                        height: flatData[i].height,
                        width: flatData[i].width,
                        folder: folder,
                        files: [],
                    });
                }
                const savedFile = savedFiles.get(flatData[i].key);
                if (!savedFile?.success)
                    continue;
                const saveRes = await this.store.save(flatData[i].key, flatData[i].data, folder);
                if (savedFile) {
                    if (!saveRes.saved) {
                        savedFile.success = false;
                        continue;
                    }
                    if (savedFile.files) {
                        savedFile.files.push(saveRes);
                    }
                }
            }
        }
        else if (media instanceof kit_2.default) {
            const videos = Array.from(media.videos.values());
            for (let i = 0; i < videos.length; i++) {
                if (!savedFiles.has(videos[i].key)) {
                    savedFiles.set(videos[i].key, {
                        success: true,
                        key: videos[i].key,
                        name: videos[i].data.name,
                        folder: folder,
                        files: [],
                    });
                }
                const savedFile = savedFiles.get(videos[i].key);
                if (!savedFile?.success)
                    continue;
                const saveRes = await this.store.saveVideo(videos[i].key, videos[i].data, folder);
                if (saveRes) {
                    if (!saveRes.saved) {
                        savedFile.success = false;
                        continue;
                    }
                    if (savedFile.files) {
                        savedFile.files.push(saveRes);
                    }
                }
            }
        }
        media.close();
        return Array.from(savedFiles.values());
    }
    async delete(key, folder) {
        return await this.store.delete(key, folder);
    }
    async get(key, folder) {
        return await this.store.get(key, folder);
    }
    stream(key, folder) {
        return this.store.stream(key, folder);
    }
}
exports.default = MediaKit;
//# sourceMappingURL=kit.js.map