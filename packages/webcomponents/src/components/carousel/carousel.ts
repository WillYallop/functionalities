class Carousel extends HTMLElement {
  private currentSlide: number;
  private carouselTrack: HTMLElement | null;
  private slides: NodeListOf<HTMLElement> | null;
  private nextButton: HTMLButtonElement | null;
  private prevButton: HTMLButtonElement | null;
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
  disconnectedCallback() {}
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {}
  static get observedAttributes() {
    return [];
  }
  // Init
  private setElements() {}
  private registerEvents() {}
  private setState() {}
  private setAttributes() {}
  private setStyle() {}
  // Events
  // Methods
}
export default Carousel;
