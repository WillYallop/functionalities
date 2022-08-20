import { ST_LocalOptions, ST_fileDataObj } from "../../../types";
import Store from ".";
export default class LocalStore extends Store {
    #private;
    localOptions: ST_LocalOptions;
    constructor(options: ST_LocalOptions, keyPrefix: string);
    save(key: string, data: ST_fileDataObj, folder?: string): void;
}
//# sourceMappingURL=local.d.ts.map