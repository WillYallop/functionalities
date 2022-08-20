"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("./image"));
class ImageKit {
    config;
    injestedImages;
    constructor(config) {
        const defaultConfig = {
            width: undefined,
            height: undefined,
            fit: "cover",
            position: "center",
            formats: {
                jpeg: {
                    quality: 80,
                },
                png: {
                    quality: 80,
                },
                webp: {
                    quality: 80,
                },
                avif: {
                    quality: 80,
                },
                svg: {
                    quality: 80,
                },
            },
        };
        this.config = { ...defaultConfig, ...config };
        this.injestedImages = new Map();
    }
    async injest(input, name) {
        const ImageInst = new image_1.default(this.config, input, name);
        this.injestedImages.set(ImageInst.key, ImageInst);
        return ImageInst;
    }
    async close() {
        this.injestedImages.clear();
    }
    get images() {
        return this.injestedImages;
    }
}
exports.default = ImageKit;
//# sourceMappingURL=kit.js.map