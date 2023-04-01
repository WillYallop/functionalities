import type Track from "./track";
import type Slide from "./slide";
import type Pagination from "./pagination";

class Container extends HTMLElement {
  track: Track | null = null;
  autoplayInterval: ReturnType<typeof setInterval> | null = null;
  disableAutoplay = false;
  disabledAutoplayTimeout: ReturnType<typeof setTimeout> | null = null;
  constructor() {
    super();
  }
  connectedCallback() {
    this.initialAttributes();
    this.registerEvents();
    if (this.autoplay) this.startAutoplay();
  }
  disconnectedCallback() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    if (this.disabledAutoplayTimeout) {
      clearTimeout(this.disabledAutoplayTimeout);
    }
    this.removeEventListener("focusin", this.stopAutoplay.bind(this));
    this.removeEventListener("focusout", this.startAutoplay.bind(this));
    this.removeEventListener("mouseenter", this.stopAutoplay.bind(this));
    this.removeEventListener("mousemove", this.stopAutoplay.bind(this));
    this.removeEventListener("mouseleave", this.startAutoplay.bind(this));
  }
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    switch (property) {
      case "autoplay": {
        if (newValue === "true") {
          this.startAutoplay();
        } else {
          this.stopAutoplay();
        }
        break;
      }
      case "duration": {
        this.stopAutoplay();
        this.startAutoplay();
        break;
      }
    }
  }
  static get observedAttributes() {
    return ["autoplay", "duration"];
  }
  // Init
  initialAttributes() {
    this.setAttribute("role", "region");
    this.setAttribute("aria-roledescription", "carousel");
  }
  registerEvents() {
    // focus in out
    this.addEventListener("focusin", this.stopAutoplay.bind(this));
    this.addEventListener("focusout", this.startAutoplay.bind(this));
    // hover in out
    this.addEventListener("mouseenter", this.stopAutoplay.bind(this));
    this.addEventListener("mousemove", this.stopAutoplay.bind(this));
    this.addEventListener("mouseleave", this.startAutoplay.bind(this));
  }
  // Methods
  startAutoplay() {
    if (!this.autoplay) return;
    if (this.playPauseButton?.classList.contains("paused")) return;
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);

    this.autoplayInterval = setInterval(() => {
      if (this.disableAutoplay) return;
      this.nextSlide();
    }, this.duration);
  }
  stopAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }

  resetSlides() {
    this.slides.forEach((slide) => {
      slide.active = false;
    });
  }
  nextSlide() {
    this.disableAutoplayAction();
    const { index } = this.currentSlide;
    let targetIndex = index + 1;
    if (index === this.slides.length - 1) targetIndex = 0;

    this.resetSlides();
    this.slides[targetIndex].active = true;
    this.slides[targetIndex].scrollTo();
  }
  previousSlide() {
    this.disableAutoplayAction();
    const { index } = this.currentSlide;
    let targetIndex = index - 1;
    if (index - 1 < 0) targetIndex = this.slides.length - 1;

    this.resetSlides();
    this.slides[targetIndex].active = true;
    this.slides[targetIndex].scrollTo();
  }
  gotToSlide(index: number) {
    this.disableAutoplayAction();
    this.resetSlides();
    this.slides[index].active = true;
    this.slides[index].scrollTo();
  }

  disableAutoplayAction() {
    if (this.disabledAutoplayTimeout) {
      clearTimeout(this.disabledAutoplayTimeout);
    }
    this.disabledAutoplayTimeout = setTimeout(() => {
      this.disableAutoplay = false;
    }, 2000);
  }
  // Getters
  get slides() {
    const slides = this.querySelectorAll("[slide-index]") as NodeListOf<Slide>;
    return slides;
  }
  get pagination() {
    return this.querySelector(
      `#carousel-pagination-${this.index}`
    ) as Pagination;
  }
  get index() {
    // get the current index of all instances of this component
    const carousels = document.querySelectorAll(
      this.tagName
    ) as NodeListOf<Container>;
    let index = 0;
    carousels.forEach((carousel, i) => {
      if (carousel === this) index = i;
    });
    return index;
  }
  get currentSlide() {
    let currentSlide = 0;
    this.slides?.forEach((slide, index) => {
      if (slide.active) currentSlide = index;
    });
    return {
      index: currentSlide,
      element: this.slides[currentSlide],
    };
  }
  get playPauseButton() {
    return this.querySelector(".cc_con__btn--play-pause") as HTMLButtonElement;
  }
  get duration() {
    return parseInt(this.getAttribute("duration") as string);
  }
  get autoplay() {
    return this.getAttribute("autoplay") === "true";
  }
  // Setters
  set autoplay(state: boolean) {
    this.setAttribute("autoplay", state.toString());
    if (state) this.startAutoplay();
    else this.stopAutoplay();
  }
}

export default Container;
