import type Container from "./container";
import type Track from "./track";
declare class Controls extends HTMLElement {
    private prevButton;
    private playPauseButton;
    private nextButton;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
    initialAttributes(): void;
    registerEvents(): void;
    updateState(): void;
    prevSlide(): void;
    nextSlide(): void;
    toggleAutoplay(): void;
    get container(): Container;
    get track(): Track;
}
export default Controls;
//# sourceMappingURL=controls.d.ts.map