interface Config {
    activeClass?: string;
    functions?: {
        [key: string]: (togglerInstance: TogglerObj, toggler: HTMLElement) => void;
    };
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
        function: string;
    };
    functions: {
        [key: string]: (togglerInstance: TogglerObj, toggler: HTMLElement) => void;
    };
}
interface TogglerObj {
    state: boolean;
    activeClass: string;
    closeTogglers: Array<string>;
    targets: Array<string>;
    function?: string;
}
export default class Toggler {
    #private;
    config: DefaultConfig;
    map: Map<string, TogglerObj>;
    constructor(config?: Config);
    toggle(toggler: string, state?: boolean): void;
}
export {};
//# sourceMappingURL=index.d.ts.map