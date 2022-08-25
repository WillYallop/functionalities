"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor() { }
    fileKey(key, ext) {
        return `${key}.${ext}`;
    }
    async saveWrapper(key, data, saveFunction, folder) {
        try {
            saveFunction(key, data, folder);
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
    async getWrapper(key, getFunction, folder) {
        try {
            return await getFunction(key, folder);
        }
        catch (err) {
            return null;
        }
    }
    async deleteWrapper(key, deleteFunction, folder) {
        try {
            deleteFunction(key, folder);
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
    streamWrapper(key, streamFunction, folder) {
        try {
            return streamFunction(key, folder);
        }
        catch (err) {
            return null;
        }
    }
    async saveVideoWrapper(key, data, saveFunction, folder) {
        try {
            saveFunction(key, data, folder);
            return {
                saved: true,
                key: this.fileKey(key, data.extension),
                mime: data.mimetype,
                extension: data.extension,
            };
        }
        catch (err) {
            console.log(err);
            return {
                saved: false,
                key: this.fileKey(key, data.extension),
                mime: data.mimetype,
                extension: data.extension,
            };
        }
    }
}
exports.default = Store;
//# sourceMappingURL=index.js.map