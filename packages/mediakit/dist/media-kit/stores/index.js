"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    options;
    constructor(options) {
        this.options = options;
    }
    fileKey(key, ext) {
        return `${this.options.keyPrefix}${key}.${ext}`;
    }
}
exports.default = Store;
//# sourceMappingURL=index.js.map