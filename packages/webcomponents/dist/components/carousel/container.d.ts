import type Track from "./track";
import type Slide from "./slide";
import type Pagination from "./pagination";
declare class Container extends HTMLElement {
    track: Track | null;
    autoplayInterval: ReturnType<typeof setInterval> | null;
    disableAutoplay: boolean;
    disabledAutoplayTimeout: ReturnType<typeof setTimeout> | null;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
    initialAttributes(): void;
    registerEvents(): void;
    startAutoplay(): void;
    stopAutoplay(): void;
    resetSlides(): void;
    nextSlide(): void;
    previousSlide(): void;
    gotToSlide(index: number): void;
    disableAutoplayAction(): void;
    get slides(): NodeListOf<Slide>;
    get pagination(): Pagination;
    get index(): number;
    get currentSlide(): {
        index: number;
        element: Slide;
    };
    get playPauseButton(): HTMLButtonElement;
    get duration(): number;
    get autoplay(): boolean;
    set autoplay(state: boolean);
}
export default Container;
//# sourceMappingURL=container.d.ts.map