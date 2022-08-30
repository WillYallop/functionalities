import AWS from "aws-sdk";
import stream from "stream";
import fs from "fs-extra";
// Types
import {
  ST_S3Options,
  ST_FileDataObj,
  ST_SaveFileResponse,
  VK_VideoData,
} from "../../../types";
// Class
import Store from ".";

export default class S3Store extends Store {
  client: AWS.S3;
  options: ST_S3Options;
  constructor(options: ST_S3Options) {
    super();
    this.options = options;
    this.client = new AWS.S3({
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
      region: options.region,
    });
  }
  save(
    key: string,
    data: ST_FileDataObj,
    folder?: string
  ): Promise<ST_SaveFileResponse> {
    // save function
    const saveFunction = async (
      key: string,
      data: ST_FileDataObj,
      folder?: string
    ) => {
      const params = {
        Bucket: this.options.bucket,
        Key: `${this.#formatFolder(folder)}${this.fileKey(
          key,
          data.extension
        )}`,
        Body: data.data,
        ContentType: data.mime,
      };
      await this.client.upload(params).promise();
    };
    // return save wrapper res
    return this.saveWrapper(key, data, saveFunction, folder);
  }
  get(key: string, folder?: string) {
    // get function
    const getFunction = async (key: string, folder?: string) => {
      const params = {
        Key: `${this.#formatFolder(folder)}${key}`,
        Bucket: this.options.bucket,
      };
      const fileRes = await this.client.getObject(params).promise();
      return fileRes.Body as Buffer;
    };
    // return get wrapper res
    return this.getWrapper(key, getFunction, folder);
  }
  delete(key: string, folder?: string) {
    // delete function
    const deleteFunction = async (key: string, folder?: string) => {
      const params = {
        Key: `${this.#formatFolder(folder)}${key}`,
        Bucket: this.options.bucket,
      };
      await this.client.deleteObject(params).promise();
    };
    // return delete wrapper res
    return this.deleteWrapper(key, deleteFunction, folder);
  }
  stream(key: string, folder?: string) {
    // stream function
    const streamFunction = (key: string, folder?: string) => {
      const params = {
        Key: `${this.#formatFolder(folder)}${key}`,
        Bucket: this.options.bucket,
      };
      return this.client.getObject(params).createReadStream();
    };
    // return stream wrapper res
    return this.streamWrapper(key, streamFunction, folder);
  }

  // video
  saveVideo(key: string, data: VK_VideoData, folder?: string) {
    // save function
    const saveFunction = async (
      key: string,
      data: VK_VideoData,
      folder?: string
    ) => {
      const { writeStream, promise } = this.#uploadStream(
        this.options.bucket,
        `${this.#formatFolder(folder)}${this.fileKey(key, data.extension)}`,
        data.mimetype
      );
      const readStream = fs.createReadStream(data.temp_location);
      readStream.pipe(writeStream);
      return promise;
    };
    // return save wrapper res
    return this.saveVideoWrapper(key, data, saveFunction, folder);
  }
  streamVideo(key: string, range: string, folder?: string) {
    // stream function
    const streamFunction = (key: string, folder?: string) => {
      const params = {
        Key: `${this.#formatFolder(folder)}${key}`,
        Bucket: this.options.bucket,
      };
      return this.client.getObject(params).createReadStream();
    };
    // return stream wrapper res
    return this.streamVideoWrapper(key, range, streamFunction, folder);
  }

  // private
  #formatFolder = (folder?: string) => {
    // remove leading slash and full stop if they exist and add a trailing slash if there isnt one
    return folder ? folder.replace(/^\//, "").replace(/\.$/, "") + "/" : "";
  };
  #uploadStream = (Bucket: string, Key: string, ContentType: string) => {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.client
        .upload({ Bucket, Key, ContentType, Body: pass })
        .promise(),
    };
  };
}
