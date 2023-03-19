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
        this.carouselTrack = this === null || this === void 0 ? void 0 : this.querySelector(".carousel-track");
        this.nextButton = document === null || document === void 0 ? void 0 : document.querySelector("#next-slide");
        this.prevButton = document === null || document === void 0 ? void 0 : document.querySelector("#prev-slide");
        this.slides = this === null || this === void 0 ? void 0 : this.querySelectorAll(".carousel-slide");
        this.updateSlides();
        this.registerEvents();
    }
    registerEvents() {
        var _a, _b;
        (_a = this.nextButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.nextSlide());
        (_b = this.prevButton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.prevSlide());
    }
    updateSlides() {
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
        if (!this.slides)
            return;
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    }
    prevSlide() {
        if (!this.slides)
            return;
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
//# sourceMappingURL=carousel.js.map