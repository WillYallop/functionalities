import type Container from "./container";
declare class Progress extends HTMLElement {
    constructor();
    connectedCallback(): void;
    render(): void;
    initialAttributes(): void;
    start(duration: number): void;
    stop(): void;
    update(progress: number): void;
    get container(): Container;
    get direction(): string;
}
export default Progress;
//# sourceMappingURL=progress.d.ts.map