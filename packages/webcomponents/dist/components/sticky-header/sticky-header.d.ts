declare class StickyHeader extends HTMLElement {
    private triggerOffset;
    private prevScrollPos;
    private scrollPos;
    private state;
    private prevState;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    private registerEvents;
    private setState;
    private onScroll;
    private setClass;
    private onResize;
}
export default StickyHeader;
//# sourceMappingURL=sticky-header.d.ts.map