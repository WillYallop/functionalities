declare class Carousel extends HTMLElement {
    private currentSlide;
    private carouselTrack;
    private slides;
    private nextButton;
    private prevButton;
    constructor();
    connectedCallback(): void;
    private registerEvents;
    private updateSlides;
    nextSlide(): void;
    prevSlide(): void;
    get template(): HTMLTemplateElement;
}
export default Carousel;
//# sourceMappingURL=carousel.d.ts.map