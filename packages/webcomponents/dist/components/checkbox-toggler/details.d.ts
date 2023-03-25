declare class Details extends HTMLElement {
    detailEle: HTMLDetailsElement;
    summaryEle: HTMLElement;
    content: HTMLElement;
    initialised: boolean;
    disableWatch: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    onFocusOut(e: Event): void;
    onToggle(): void;
    open(): void;
    close(): void;
}
export default Details;
//# sourceMappingURL=details.d.ts.map