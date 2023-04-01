declare class Details extends HTMLElement {
    private detailEle;
    private summaryEle;
    private content;
    private disableWatch;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    private setElements;
    private registerEvents;
    private setState;
    private setAttributes;
    private onFocusOut;
    private onToggle;
    private onHoverIn;
    private onHoverOut;
    private open;
    private close;
}
export default Details;
//# sourceMappingURL=details.d.ts.map