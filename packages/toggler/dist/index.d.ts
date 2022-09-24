interface Config {
    activeClass?: string;
}
interface DefaultConfig {
    activeClass: string;
    attributes: {
        toggler: string;
        receiver: string;
        class: string;
        state: string;
        close: string;
        targets: string;
    };
}
interface TogglerObj {
    state: boolean;
    activeClass: string;
    closeTogglers: Array<string>;
    targets: Array<string>;
}
export default class Toggler {
    #private;
    config: DefaultConfig;
    map: Map<string, TogglerObj>;
    constructor(config?: Config);
}
export {};
//# sourceMappingURL=index.d.ts.map