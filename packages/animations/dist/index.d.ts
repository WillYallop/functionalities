interface Config {
    activeClass?: string;
    reset?: boolean;
    threshold?: number;
}
interface DefaultConfig {
    activeClass: string;
    reset: boolean;
    threshold: number;
    attributes: {
        animate: string;
    };
}
interface AnimationAttributeObj {
    class: string;
    delay?: number;
    reset?: boolean;
}
export default class Animations {
    #private;
    config: DefaultConfig;
    map: WeakMap<HTMLElement, Array<AnimationAttributeObj>>;
    constructor(config?: Config);
}
export {};
//# sourceMappingURL=index.d.ts.map