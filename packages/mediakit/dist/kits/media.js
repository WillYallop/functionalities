"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = __importDefault(require("../stores/s3"));
const local_1 = __importDefault(require("../stores/local"));
//
const path_1 = __importDefault(require("path"));
class MediaKit {
    options;
    store;
    constructor(options) {
        // set options
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
        // create store
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
    // abstractions on top of store methods
    save(media) {
        console.log(media);
    }
    delete(id) {
        console.log(id);
    }
    get(id) {
        console.log(id);
    }
    // stream media
    stream(id) {
        console.log(id);
    }
}
exports.default = MediaKit;
