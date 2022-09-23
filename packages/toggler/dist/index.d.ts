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
        multi: string;
        multiTargets: string;
        multiState: string;
    };
}
interface TogglerObj {
    state: boolean;
    activeClass: string;
    closeTogglers: Array<string>;
}
interface TogglerMultiObj {
    state: boolean;
    activeClass: string;
    targets: Array<string>;
}
export default class Toggler {
    #private;
    config: DefaultConfig;
    map: Map<string, TogglerObj>;
    multiToggler: Map<string, TogglerMultiObj>;
    constructor(config?: Config);
}
export {};
//# sourceMappingURL=index.d.ts.map