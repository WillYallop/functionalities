"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
const image_1 = __importDefault(require("../singles/image"));
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
        const imageData = {
            key: (0, uuid_1.v4)(),
            width: 0,
            height: 0,
            name: "",
            images: undefined,
        };
        const image = (0, sharp_1.default)(input);
        const metadata = await image.metadata();
        imageData.width = metadata.width || 0;
        imageData.height = metadata.height || 0;
        imageData.name = name || "";
        const imageMimes = {
            jpeg: "image/jpeg",
            png: "image/png",
            webp: "image/webp",
            avif: "image/avif",
            svg: "image/svg+xml",
            gif: "image/gif",
        };
        const imagesTypeData = (target) => {
            if (!metadata.format)
                return undefined;
            if (target !== metadata.format)
                return undefined;
            return {
                data: input,
                mime: imageMimes[target],
            };
        };
        imageData.images = {
            jpeg: imagesTypeData("jpeg"),
            png: imagesTypeData("png"),
            webp: imagesTypeData("webp"),
            avif: imagesTypeData("avif"),
            svg: imagesTypeData("svg"),
            gif: imagesTypeData("gif"),
        };
        const ImageInst = new image_1.default(imageData, image);
        this.injestedImages.set(imageData.key, ImageInst);
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
//# sourceMappingURL=image.js.map