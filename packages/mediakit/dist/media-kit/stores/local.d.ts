import { ST_LocalOptions, ST_fileDataObj } from "../../../types";
import Store from ".";
export default class LocalStore extends Store {
    constructor(options: ST_LocalOptions);
    save(key: string, data: Array<ST_fileDataObj>): void;
}
//# sourceMappingURL=local.d.ts.map