import type Container from "./container";
import type Track from "./track";

class Controls extends HTMLElement {
  private prevButton: HTMLElement | null = null;
  private playPauseButton: HTMLElement | null = null;
  private nextButton: HTMLElement | null = null;
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    this.initialAttributes();
    this.registerEvents();
  }
  disconnectedCallback() {
    this.prevButton?.removeEventListener("click", this.prevSlide.bind(this));
    this.nextButton?.removeEventListener("click", this.nextSlide.bind(this));
  }
  // Init
  render() {
    this.innerHTML = `
          <div class="cc-con">
              <button class="cc-con__btn cc-con__btn--prev" aria-label="Previous slide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4a32 32 0 0 0 0 45.3l192 192a32 32 0 0 0 45.3-45.3L77.3 256 246.6 86.6a32 32 0 0 0-45.3-45.3l-192 192z"/></svg>
              </button>
              <button class="cc-con__btn cc-con__btn--play-pause">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48H48zm192 0a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48h-32z"/></svg>
              </button>
              <button class="cc-con__btn cc-con__btn--next" aria-label="Next slide">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4a32 32 0 0 1 0 45.3l-192 192a32 32 0 0 1-45.3-45.3L242.7 256 73.4 86.6a32 32 0 0 1 45.3-45.3l192 192z"/></svg>
              </button>
          </div>
          `;

    this.prevButton = this.querySelector(".cc-con__btn--prev") as HTMLElement;
    this.nextButton = this.querySelector(".cc-con__btn--next") as HTMLElement;
    this.playPauseButton = this.querySelector(
      ".cc-con__btn--play-pause"
    ) as HTMLElement;
  }
  initialAttributes() {
    this.playPauseButton?.setAttribute("aria-controls", this.track.id);
    this.updateState();
  }
  registerEvents() {
    this.prevButton?.addEventListener("click", this.prevSlide.bind(this));
    this.nextButton?.addEventListener("click", this.nextSlide.bind(this));
    this.playPauseButton?.addEventListener(
      "click",
      this.toggleAutoplay.bind(this)
    );
  }
  updateState() {
    if (this.playPauseButton) {
      if (this.container.autoplay) {
        this.playPauseButton.setAttribute("aria-label", "Pause");
        this.playPauseButton.classList.remove("paused");
        this.playPauseButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48H48zm192 0a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48h-32z"/></svg>';
        this.track.setAttribute("aria-live", "off");
      } else {
        this.playPauseButton.setAttribute("aria-label", "Play");
        this.playPauseButton.classList.add("paused");
        this.playPauseButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39A47.9 47.9 0 0 0 0 80v352a48 48 0 0 0 73 41l288-176a48 48 0 0 0 0-82L73 39z"/></svg>';
        this.track.setAttribute("aria-live", "polite");
      }
    }
  }
  // Events
  prevSlide() {
    this.container?.previousSlide();
  }
  nextSlide() {
    this.container?.nextSlide();
  }
  toggleAutoplay() {
    if (this.container.autoplay) this.container.autoplay = false;
    else this.container.autoplay = true;
    this.updateState();
  }
  // Getters
  get container() {
    return this.parentElement as Container;
  }
  get track() {
    return this.container.track as Track;
  }
}

export default Controls;
