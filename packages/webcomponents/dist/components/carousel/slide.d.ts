import type Track from "./track";
declare class Slide extends HTMLElement {
    private scrollTimeout;
    constructor();
    connectedCallback(): void;
    initialAttributes(): void;
    registerObserver(): void;
    updateAttributes(state: boolean): void;
    scrollTo(): void;
    get track(): Track;
    get active(): boolean;
    get index(): number;
    set active(state: boolean);
}
export default Slide;
//# sourceMappingURL=slide.d.ts.map