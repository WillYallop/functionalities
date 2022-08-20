"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("./image"));
const s3_1 = __importDefault(require("../stores/s3"));
const local_1 = __importDefault(require("../stores/local"));
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
            keyPrefix: "",
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
    save(media) {
        if (media instanceof image_1.default) {
            console.log(media.images);
            return {
                success: media.images,
            };
        }
    }
    delete(id) {
        console.log(id);
    }
    get(id) {
        console.log(id);
    }
    stream(id) {
        console.log(id);
    }
}
exports.default = MediaKit;
//# sourceMappingURL=media.js.map