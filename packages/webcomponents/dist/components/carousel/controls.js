class Controls extends HTMLElement {
    constructor() {
        super();
        this.prevButton = null;
        this.playPauseButton = null;
        this.nextButton = null;
    }
    connectedCallback() {
        this.render();
        this.initialAttributes();
        this.registerEvents();
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.prevButton) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.prevSlide.bind(this));
        (_b = this.nextButton) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", this.nextSlide.bind(this));
    }
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
        this.prevButton = this.querySelector(".cc-con__btn--prev");
        this.nextButton = this.querySelector(".cc-con__btn--next");
        this.playPauseButton = this.querySelector(".cc-con__btn--play-pause");
    }
    initialAttributes() {
        var _a;
        (_a = this.playPauseButton) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-controls", this.track.id);
        this.updateState();
    }
    registerEvents() {
        var _a, _b, _c;
        (_a = this.prevButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.prevSlide.bind(this));
        (_b = this.nextButton) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.nextSlide.bind(this));
        (_c = this.playPauseButton) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.toggleAutoplay.bind(this));
    }
    updateState() {
        if (this.playPauseButton) {
            if (this.container.autoplay) {
                this.playPauseButton.setAttribute("aria-label", "Pause");
                this.playPauseButton.classList.remove("paused");
                this.playPauseButton.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48H48zm192 0a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h32a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48h-32z"/></svg>';
                this.track.setAttribute("aria-live", "off");
            }
            else {
                this.playPauseButton.setAttribute("aria-label", "Play");
                this.playPauseButton.classList.add("paused");
                this.playPauseButton.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39A47.9 47.9 0 0 0 0 80v352a48 48 0 0 0 73 41l288-176a48 48 0 0 0 0-82L73 39z"/></svg>';
                this.track.setAttribute("aria-live", "polite");
            }
        }
    }
    prevSlide() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.previousSlide();
    }
    nextSlide() {
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.nextSlide();
    }
    toggleAutoplay() {
        if (this.container.autoplay)
            this.container.autoplay = false;
        else
            this.container.autoplay = true;
        this.updateState();
    }
    get container() {
        return this.parentElement;
    }
    get track() {
        return this.container.track;
    }
}
export default Controls;
//# sourceMappingURL=controls.js.map