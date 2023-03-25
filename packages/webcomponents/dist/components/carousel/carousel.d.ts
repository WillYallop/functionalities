declare class Carousel extends HTMLElement {
    private currentSlide;
    private carouselTrack;
    private slides;
    private nextButton;
    private prevButton;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(property: string, oldValue: string, newValue: string): void;
    static get observedAttributes(): never[];
    private setElements;
    private registerEvents;
    private setState;
    private setAttributes;
    private setStyle;
}
export default Carousel;
//# sourceMappingURL=carousel.d.ts.map