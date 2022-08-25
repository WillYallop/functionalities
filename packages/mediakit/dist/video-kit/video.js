"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mime_types_1 = __importDefault(require("mime-types"));
class Video {
    config;
    videoData;
    constructor(config, location, mimetype, name) {
        this.config = config;
        this.videoData = {
            key: `${this.config.keyPrefix}${(0, uuid_1.v4)()}`,
            name: name || "",
            temp_location: location,
            mimetype: mimetype,
            extension: mime_types_1.default.extension(mimetype) || "",
        };
    }
    get data() {
        return this.videoData;
    }
    get key() {
        return this.videoData.key;
    }
}
exports.default = Video;
//# sourceMappingURL=video.js.map