"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const _1 = __importDefault(require("."));
class S3Store extends _1.default {
    constructor(options) {
        super();
    }
    save(key, data) { }
    get(key, folder) { }
    delete(key) { }
    stream(key, folder) {
        const filePath = path_1.default.join("./uploads", folder || "", key);
        return fs_extra_1.default.createReadStream(filePath);
    }
}
exports.default = S3Store;
//# sourceMappingURL=s3.js.map