class Carousel extends HTMLElement {
    constructor() {
        super();
        this.currentSlide = 0;
        this.carouselTrack = null;
        this.nextButton = null;
        this.prevButton = null;
        this.slides = null;
    }
    connectedCallback() {
        this.setElements();
        this.registerEvents();
        this.setState();
        this.setAttributes();
        this.setStyle();
    }
    disconnectedCallback() { }
    attributeChangedCallback(property, oldValue, newValue) { }
    static get observedAttributes() {
        return [];
    }
    setElements() { }
    registerEvents() { }
    setState() { }
    setAttributes() { }
    setStyle() { }
}
export default Carousel;
//# sourceMappingURL=carousel.js.map