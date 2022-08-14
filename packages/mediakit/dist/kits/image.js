"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
class ImageKit {
    input;
    config;
    imageData;
    image;
    constructor(input, config) {
        this.input = input;
        this.config = {
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
        this.imageData = {
            key: (0, uuid_1.v4)(),
            width: 0,
            height: 0,
            name: config?.name || "",
            images: undefined,
        };
        this.image = (0, sharp_1.default)(this.input);
        this.image.metadata().then((metadata) => {
            this.imageData.width = metadata.width || 0;
            this.imageData.height = metadata.height || 0;
            this.#setImageData(metadata);
            if (config.injested)
                config.injested();
        });
    }
    async #setImageData(metadata) {
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
                data: this.input,
                mime: imageMimes[target],
            };
        };
        this.imageData.images = {
            jpeg: imagesTypeData("jpeg"),
            png: imagesTypeData("png"),
            webp: imagesTypeData("webp"),
            avif: imagesTypeData("avif"),
            svg: imagesTypeData("svg"),
            gif: imagesTypeData("gif"),
        };
    }
    async process(config) {
        this.config = { ...this.config, ...config };
    }
    get key() {
        return this.data.key;
    }
    get data() {
        return this.imageData;
    }
}
exports.default = ImageKit;
//# sourceMappingURL=image.js.map