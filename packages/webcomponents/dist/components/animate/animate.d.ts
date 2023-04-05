declare type on = "visible" | "load";
declare class Animate extends HTMLElement {
    observer: IntersectionObserver | null;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    setStyle(): void;
    registerObserver(): void;
    handleObserver(entries: IntersectionObserverEntry[]): void;
    get animateAttribute(): boolean;
    get on(): on;
    get type(): string;
    get delay(): number;
    get threshhold(): number;
    get reset(): boolean;
    set animateAttribute(value: boolean);
    set on(value: on);
    set type(value: string);
    set delay(value: number);
    set threshhold(value: number);
    set reset(value: boolean);
}
export default Animate;
//# sourceMappingURL=animate.d.ts.map