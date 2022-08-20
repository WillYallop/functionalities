"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const imageMimes = {
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    avif: "image/avif",
    svg: "image/svg+xml",
    gif: "image/gif",
};
class Image {
    image;
    imageData;
    config;
    constructor(config, input, name) {
        this.config = config;
        this.imageData = {
            key: (0, uuid_1.v4)(),
            width: 0,
            height: 0,
            name: "",
            images: {
                jpeg: undefined,
                png: undefined,
                webp: undefined,
                avif: undefined,
                svg: undefined,
                gif: undefined,
            },
        };
        this.image = (0, sharp_1.default)(input);
        this.image.metadata().then((metadata) => {
            this.imageData.width = metadata.width || 0;
            this.imageData.height = metadata.height || 0;
            this.imageData.originalFormat = metadata.format || "";
            this.imageData.name = name || "";
            this.imageData.hasAlpha = metadata.hasAlpha || false;
        });
    }
    async #converToJPEG() {
        const buffer = await this.image
            .jpeg({
            mozjpeg: true,
            quality: this.config.formats?.jpeg?.quality || 80,
        })
            .toBuffer();
        this.imageData.images.jpeg = {
            data: buffer,
            mime: imageMimes.jpeg,
        };
    }
    async #convertToPNG() {
        const buffer = await this.image
            .png({
            quality: this.config.formats?.png?.quality || 80,
        })
            .toBuffer();
        this.imageData.images.png = {
            data: buffer,
            mime: imageMimes.png,
        };
    }
    async #convertToWEBP() {
        const buffer = await this.image
            .webp({
            quality: this.config.formats?.webp?.quality || 80,
        })
            .toBuffer();
        this.imageData.images.webp = {
            data: buffer,
            mime: imageMimes.webp,
        };
    }
    async #convertToAVIF() {
        const buffer = await this.image.avif().toBuffer();
        this.imageData.images.avif = {
            data: buffer,
            mime: imageMimes.avif,
        };
    }
    async #optimiseGIF() {
        const buffer = await this.image.toBuffer();
        this.imageData.images.gif = {
            data: buffer,
            mime: imageMimes.gif,
        };
    }
    async #optimiseSVG() {
        const buffer = await this.image.toBuffer();
        this.imageData.images.svg = {
            data: buffer,
            mime: imageMimes.svg,
        };
    }
    async process() {
        const start = Date.now();
        this.image.rotate();
        if (this.config.width || this.config.height) {
            this.image.resize(this.config.width || this.imageData.width, this.config.height || this.imageData.height, {
                fit: this.config.fit,
                position: this.config.position,
            });
        }
        if (this.imageData.originalFormat === "gif") {
            await this.#optimiseGIF();
            return {
                complete: true,
                time: Date.now() - start,
            };
        }
        else if (this.imageData.originalFormat === "svg") {
            await this.#optimiseSVG();
            return {
                complete: true,
                time: Date.now() - start,
            };
        }
        else {
            if (this.imageData.hasAlpha)
                await this.#convertToPNG();
            else
                await this.#converToJPEG();
            await this.#convertToWEBP();
            await this.#convertToAVIF();
            return {
                complete: true,
                time: Date.now() - start,
            };
        }
    }
    get data() {
        return this.imageData;
    }
    get key() {
        return this.imageData.key;
    }
}
exports.default = Image;
//# sourceMappingURL=image.js.map