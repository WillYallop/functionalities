import { ST_S3Options, ST_fileDataObj } from "../../../types";
import Store from ".";
export default class S3Store extends Store {
    constructor(options: ST_S3Options, keyPrefix: string);
    save(key: string, data: ST_fileDataObj): void;
}
//# sourceMappingURL=s3.d.ts.map