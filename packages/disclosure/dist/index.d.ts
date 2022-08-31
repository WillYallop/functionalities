interface configParam {
    idPrefix?: string;
    activeClass?: string;
    targetAttribute?: string;
    duration?: number;
    defaultState?: boolean;
}
interface config {
    idPrefix: string;
    activeClass: string;
    targetAttribute: string;
    duration: number;
    defaultState: boolean;
}
interface disclosureObj {
    index: number;
    state: boolean;
    region: HTMLElement;
    regionScrollHeight: number;
    togglers: NodeListOf<HTMLElement>;
}
declare type disclosures = WeakMap<HTMLElement, disclosureObj>;
export default class Disclosure {
    #private;
    attributes: {
        container: string;
        region: string;
        toggle: string;
    };
    disclosures: disclosures;
    config: config;
    constructor(config?: configParam);
}
export {};
//# sourceMappingURL=index.d.ts.map