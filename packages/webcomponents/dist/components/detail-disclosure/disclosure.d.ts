declare class Disclosure extends HTMLElement {
    private detailEle;
    private summaryEle;
    private content;
    private disableWatch;
    private group;
    private duration;
    private closeSetTimeout?;
    private state;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    private setElements;
    private registerEvents;
    private setState;
    private setAttributes;
    private setStyle;
    private detailsClick;
    private summaryClick;
    private contentClick;
    private open;
    private close;
    private toggleGroup;
}
export default Disclosure;
//# sourceMappingURL=disclosure.d.ts.map