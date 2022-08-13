import S3Store from "../stores/s3";
import LocalStore from "../stores/local";
//
import path from "path";
export default class MediaKit {
    options;
    store;
    constructor(options) {
        // set options
        const defaultOptions = {
            storeMethod: "local",
            s3Options: {
                accessKeyId: "",
                secretAccessKey: "",
                region: "",
                bucket: "",
            },
            localOptions: {
                directory: path.resolve("/media"),
            },
            keyPrefix: "",
        };
        this.options = { ...defaultOptions, ...options };
        // create store
        switch (this.options.storeMethod) {
            case "s3":
                this.store = new S3Store(this.options.s3Options);
                break;
            case "local":
                this.store = new LocalStore(this.options.localOptions);
                break;
            default:
                throw new Error("Invalid store method");
        }
    }
    // abstractions on top of store methods
    save(media) {
        console.log(media);
    }
    delete(id) {
        console.log(id);
    }
    get(id) {
        console.log(id);
    }
    // stream media
    stream(id) {
        console.log(id);
    }
}
