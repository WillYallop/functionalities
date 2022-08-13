"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageKit {
    input;
    config;
    constructor(input, config) {
        this.input = input;
        // set config
        const defaultConfig = {
            width: undefined,
            height: undefined,
            fit: "cover",
            position: "center",
            formats: {
                jpeg: {
                    convert: true,
                    quality: 100,
                },
                png: {
                    convert: true,
                    quality: 100,
                },
                webp: {
                    convert: true,
                    quality: 100,
                },
                avif: {
                    convert: true,
                    quality: 100,
                },
            },
        };
        this.config = { ...defaultConfig, ...config };
    }
    // Handle resizing the image & converting it to a different format
    async process() {
        console.log("");
    }
}
exports.default = ImageKit;
