interface ST_Options {
    keyPrefix: string;
}
export default class Store {
    options: ST_Options;
    constructor(options: ST_Options);
    fileKey(key: string, ext: string): string;
}
export {};
//# sourceMappingURL=index.d.ts.map