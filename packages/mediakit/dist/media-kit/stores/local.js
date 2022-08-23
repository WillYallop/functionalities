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
    async save(key, data, folder) {
        try {
            this.#buildDirectories(folder);
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", this.fileKey(key, data.extension));
            await fs_extra_1.default.writeFile(filePath, data.data);
            return {
                saved: true,
                key: this.fileKey(key, data.extension),
                mime: data.mime,
                extension: data.extension,
            };
        }
        catch (err) {
            console.log(err);
            return {
                saved: false,
                key: this.fileKey(key, data.extension),
                mime: data.mime,
                extension: data.extension,
            };
        }
    }
    get(key, folder) {
        try {
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
            return fs_extra_1.default.readFileSync(filePath);
        }
        catch (err) {
            return null;
        }
    }
    delete(key, folder) {
        try {
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
            fs_extra_1.default.unlinkSync(filePath);
            return {
                deleted: true,
            };
        }
        catch (err) {
            return {
                deleted: false,
            };
        }
    }
    stream(key, folder) {
        try {
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
            return fs_extra_1.default.createReadStream(filePath);
        }
        catch (err) {
            return null;
        }
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