"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CHUNK_SIZE = 5 * 1024 * 1024;
class Store {
    constructor() { }
    fileKey(key, ext) {
        return `${key}.${ext}`;
    }
    streamRange(range, videoSize) {
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        return {
            start,
            end,
            headers: {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            },
        };
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
            await saveFunction(key, data, folder);
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
    async streamVideoWrapper(key, range, streamFunction, folder) {
        try {
            return await streamFunction(key, range, folder);
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Store;
//# sourceMappingURL=index.js.map