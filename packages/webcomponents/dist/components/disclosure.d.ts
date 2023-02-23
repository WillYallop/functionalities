import ProgressiveDetails from "./details";
declare class Disclosure extends ProgressiveDetails {
    initialised: boolean;
    group: string;
    duration: number;
    closeSetTimeout?: ReturnType<typeof setTimeout>;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    onClick(e: Event): void;
    summaryClick(e: Event): void;
    onToggle(): void;
    open(): void;
}
export default Disclosure;
//# sourceMappingURL=disclosure.d.ts.map