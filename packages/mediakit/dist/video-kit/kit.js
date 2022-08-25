"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_1 = __importDefault(require("./video"));
class VideoKit {
    config;
    injestedVideos;
    constructor(config) {
        const defaultConfig = {
            keyPrefix: "",
        };
        this.config = { ...defaultConfig, ...config };
        this.injestedVideos = new Map();
    }
    async injest(location, mimetype, name) {
        const VideoInst = new video_1.default(this.config, location, mimetype, name);
        this.injestedVideos.set(VideoInst.key, VideoInst);
        return VideoInst;
    }
    async close() {
        this.injestedVideos.clear();
    }
    get videos() {
        return this.injestedVideos;
    }
}
exports.default = VideoKit;
//# sourceMappingURL=kit.js.map