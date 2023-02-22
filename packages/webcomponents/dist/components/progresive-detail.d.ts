declare class ProgressiveDetails extends HTMLElement {
    detailEle: HTMLDetailsElement;
    summaryEle: HTMLElement;
    content: HTMLElement;
    animations?: Animation[];
    initialised: boolean;
    disableWatch: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    onFocusOut(): void;
    onToggle(): void;
    open(): void;
    close(): void;
}
export default ProgressiveDetails;
//# sourceMappingURL=progresive-detail.d.ts.map