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
        const saveFunction = async (key, data, folder) => {
            this.#buildDirectories(folder);
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", this.fileKey(key, data.extension));
            await fs_extra_1.default.writeFile(filePath, data.data);
        };
        return this.saveWrapper(key, data, saveFunction, folder);
    }
    get(key, folder) {
        const getFunction = async (key, folder) => {
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", key);
            return await fs_extra_1.default.readFile(filePath);
        };
        return this.getWrapper(key, getFunction, folder);
    }
    delete(key, folder) {
        const deleteFunction = (key, folder) => {
            if (fs_extra_1.default.existsSync(this.#filePath(key, folder))) {
                fs_extra_1.default.unlinkSync(this.#filePath(key, folder));
            }
        };
        return this.deleteWrapper(key, deleteFunction, folder);
    }
    stream(key, folder) {
        const streamFunction = (key, folder) => {
            return fs_extra_1.default.createReadStream(this.#filePath(key, folder));
        };
        return this.streamWrapper(key, streamFunction, folder);
    }
    saveVideo(key, data, folder) {
        const saveFunction = async (key, data, folder) => {
            this.#buildDirectories(folder);
            const filePath = path_1.default.join(this.localOptions.directory, folder || "", this.fileKey(key, data.extension));
            await fs_extra_1.default.move(data.temp_location, filePath);
        };
        return this.saveVideoWrapper(key, data, saveFunction, folder);
    }
    streamVideo(key, range, folder) {
        const streamFunction = async (key, range, folder) => {
            const videoSize = fs_extra_1.default.statSync(this.#filePath(key, folder)).size;
            const streamRange = this.streamRange(range, videoSize);
            return {
                stream: fs_extra_1.default.createReadStream(this.#filePath(key, folder), {
                    start: streamRange.start,
                    end: streamRange.end,
                }),
                headers: streamRange.headers,
            };
        };
        return this.streamVideoWrapper(key, range, streamFunction, folder);
    }
    #buildDirectories(folder) {
        const dir = path_1.default.join(this.localOptions.directory, folder || "");
        if (!fs_extra_1.default.existsSync(dir))
            fs_extra_1.default.mkdirSync(dir, {
                recursive: true,
            });
    }
    #filePath(key, folder) {
        return path_1.default.join(this.localOptions.directory, folder || "", key);
    }
}
exports.default = LocalStore;
//# sourceMappingURL=local.js.map