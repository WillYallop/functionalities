"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Image {
    image;
    imageData;
    constructor(data, image) {
        this.imageData = data;
        this.image = image;
    }
    async process() {
        return {
            data: "data",
        };
    }
    get data() {
        return this.imageData;
    }
}
exports.default = Image;
//# sourceMappingURL=image.js.map