"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
class S3Store extends _1.default {
    constructor(options, keyPrefix) {
        super({
            keyPrefix: keyPrefix,
        });
    }
    save(key, data) { }
}
exports.default = S3Store;
//# sourceMappingURL=s3.js.map