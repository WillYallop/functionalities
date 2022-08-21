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
    save(media, folder) {
        if (media instanceof kit_1.default) {
            const flatData = (0, flatten_images_1.default)(media.images);
            for (let i = 0; i < flatData.length; i++) {
                this.store.save(flatData[i].key, flatData[i].data, folder);
            }
        }
        else if (media instanceof kit_2.default) {
        }
        media.close();
        return {
            success: true,
        };
    }
    delete(key) {
        this.store.delete(key);
    }
    get(key, folder) {
        this.store.get(key, folder);
    }
    stream(key, folder) {
        return this.store.stream(key, folder);
    }
}
exports.default = MediaKit;
//# sourceMappingURL=kit.js.map