declare class StickyHeader extends HTMLElement {
    initialised: boolean;
    triggerOffset: number;
    prevScrollPos: number;
    scrollPos: number;
    state: string;
    prevState: string;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    onScroll(): void;
    setClass(): void;
    onResize(): void;
}
export default StickyHeader;
//# sourceMappingURL=sticky-header.d.ts.map