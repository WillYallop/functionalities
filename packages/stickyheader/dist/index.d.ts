interface configParam {
    triggerDistance?: number;
    classes?: {
        top?: string;
        movedDown?: string;
        movedUp?: string;
    };
    onChange?: (response: {
        state: string;
        scrollPos: number;
    }) => void;
}
interface config {
    triggerDistance: number;
    classes: {
        top: string;
        movedDown: string;
        movedUp: string;
    };
    onChange?: configParam["onChange"];
}
export default class StickyHeader {
    config: config;
    headerEle: HTMLElement;
    scrollPos: number;
    prevScrollPos: number;
    state?: string;
    prevState?: string;
    onScroll?: () => void;
    onScrollHandler?: () => void;
    constructor(id: string, config?: configParam);
    destroy(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map