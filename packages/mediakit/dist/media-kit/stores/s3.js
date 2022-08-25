"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const _1 = __importDefault(require("."));
class S3Store extends _1.default {
    client;
    options;
    constructor(options) {
        super();
        this.options = options;
        this.client = new aws_sdk_1.default.S3({
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey,
            region: options.region,
        });
    }
    save(key, data, folder) {
        const saveFunction = async (key, data, folder) => {
            const params = {
                Bucket: this.options.bucket,
                Key: `${this.#formatFolder(folder)}${this.fileKey(key, data.extension)}`,
                Body: data.data,
                ContentType: data.mime,
            };
            await this.client.upload(params).promise();
        };
        return this.saveWrapper(key, data, saveFunction, folder);
    }
    get(key, folder) {
        const getFunction = async (key, folder) => {
            const params = {
                Key: `${this.#formatFolder(folder)}${key}`,
                Bucket: this.options.bucket,
            };
            const fileRes = await this.client.getObject(params).promise();
            return fileRes.Body;
        };
        return this.getWrapper(key, getFunction, folder);
    }
    delete(key, folder) {
        const deleteFunction = async (key, folder) => {
            const params = {
                Key: `${this.#formatFolder(folder)}${key}`,
                Bucket: this.options.bucket,
            };
            await this.client.deleteObject(params).promise();
        };
        return this.deleteWrapper(key, deleteFunction, folder);
    }
    stream(key, folder) {
        const streamFunction = (key, folder) => {
            const params = {
                Key: `${this.#formatFolder(folder)}${key}`,
                Bucket: this.options.bucket,
            };
            return this.client.getObject(params).createReadStream();
        };
        return this.streamWrapper(key, streamFunction, folder);
    }
    saveVideo(key, data, folder) {
        const saveFunction = async (key, data, folder) => { };
        return this.saveVideoWrapper(key, data, saveFunction, folder);
    }
    #formatFolder = (folder) => {
        return folder ? folder.replace(/^\//, "").replace(/\.$/, "") + "/" : "";
    };
}
exports.default = S3Store;
//# sourceMappingURL=s3.js.map