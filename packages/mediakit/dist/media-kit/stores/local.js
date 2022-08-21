"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const _1 = __importDefault(require("."));
class LocalStore extends _1.default {
    localOptions;
    constructor(options) {
        super();
        this.localOptions = options;
    }
    save(key, data, folder) {
        this.#buildDirectories(folder);
        const filePath = path_1.default.join(this.localOptions.directory, folder || "", this.fileKey(key, data.extension));
        fs_extra_1.default.writeFileSync(filePath, data.data);
    }
    get(key, folder) {
        const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
        return fs_extra_1.default.readFileSync(filePath);
    }
    delete(key, folder) {
        const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
        fs_extra_1.default.unlinkSync(filePath);
        return {
            deleted: true,
        };
    }
    stream(key, folder) {
        const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
        console.log("LOCAL STORE");
        return fs_extra_1.default.createReadStream(filePath);
    }
    #buildDirectories(folder) {
        const dir = path_1.default.join(this.localOptions.directory, folder || "");
        if (!fs_extra_1.default.existsSync(dir))
            fs_extra_1.default.mkdirSync(dir, {
                recursive: true,
            });
    }
}
exports.default = LocalStore;
//# sourceMappingURL=local.js.map