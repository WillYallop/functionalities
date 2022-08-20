"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flattenImageData = (imgMap) => {
    const imagesArr = Array.from(imgMap.values());
    const flatData = [];
    imagesArr.map((img) => {
        flatData.push({
            key: img.key,
            data: img.data.images,
        });
    });
    return flatData;
};
exports.default = flattenImageData;
//# sourceMappingURL=flatten-images.js.map