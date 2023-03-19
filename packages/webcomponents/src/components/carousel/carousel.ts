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
    this.carouselTrack = this?.querySelector(".carousel-track") as HTMLElement;
    this.nextButton = document?.querySelector(
      "#next-slide"
    ) as HTMLButtonElement;
    this.prevButton = document?.querySelector(
      "#prev-slide"
    ) as HTMLButtonElement;
    this.slides = this?.querySelectorAll(
      ".carousel-slide"
    ) as NodeListOf<HTMLElement>;
    this.updateSlides();
    this.registerEvents();
  }
  private registerEvents() {
    this.nextButton?.addEventListener("click", () => this.nextSlide());
    this.prevButton?.addEventListener("click", () => this.prevSlide());
  }

  private updateSlides() {
    if (!this.carouselTrack || !this.slides) {
      return;
    }

    const slideCount = this.slides.length;
    const angleStep = 360 / slideCount;

    this.slides.forEach((slide, index) => {
      const angle = angleStep * index;
      const tx = Math.sin((angle * Math.PI) / 180) * 50;
      const tz = Math.cos((angle * Math.PI) / 180) * 50 - 50;

      slide.style.transform = `translateX(${tx}%) translateZ(${tz}px) rotateY(${angle}deg)`;
    });

    const rotation = -angleStep * this.currentSlide;
    this.carouselTrack.style.transform = `rotateY(${rotation}deg)`;
  }

  nextSlide() {
    if (!this.slides) return;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
  }

  prevSlide() {
    if (!this.slides) return;
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  get template() {
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="carousel-track">
          <div class="carousel-slide">1</div>
          <div class="carousel-slide">2</div>
          <div class="carousel-slide">3</div>
          <div class="carousel-slide">4</div>
          <div class="carousel-slide">5</div>
        </div>
      `;
    return template;
  }
}
export default Carousel;
