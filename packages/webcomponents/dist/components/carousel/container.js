class Container extends HTMLElement {
    constructor() {
        super();
        this.track = null;
        this.autoplayInterval = null;
        this.disableAutoplay = false;
        this.disabledAutoplayTimeout = null;
    }
    connectedCallback() {
        this.initialAttributes();
        this.registerEvents();
        if (this.autoplay)
            this.startAutoplay();
    }
    disconnectedCallback() {
        if (this.autoplayInterval)
            clearInterval(this.autoplayInterval);
        if (this.disabledAutoplayTimeout) {
            clearTimeout(this.disabledAutoplayTimeout);
        }
        this.removeEventListener("focusin", this.stopAutoplay.bind(this));
        this.removeEventListener("focusout", this.startAutoplay.bind(this));
        this.removeEventListener("mouseenter", this.stopAutoplay.bind(this));
        this.removeEventListener("mousemove", this.stopAutoplay.bind(this));
        this.removeEventListener("mouseleave", this.startAutoplay.bind(this));
    }
    attributeChangedCallback(property, oldValue, newValue) {
        switch (property) {
            case "autoplay": {
                if (newValue === "true") {
                    this.startAutoplay();
                }
                else {
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
    initialAttributes() {
        this.setAttribute("role", "region");
        this.setAttribute("aria-roledescription", "carousel");
    }
    registerEvents() {
        this.addEventListener("focusin", this.stopAutoplay.bind(this));
        this.addEventListener("focusout", this.startAutoplay.bind(this));
        this.addEventListener("mouseenter", this.stopAutoplay.bind(this));
        this.addEventListener("mousemove", this.stopAutoplay.bind(this));
        this.addEventListener("mouseleave", this.startAutoplay.bind(this));
    }
    startAutoplay() {
        var _a;
        if (!this.autoplay)
            return;
        if ((_a = this.playPauseButton) === null || _a === void 0 ? void 0 : _a.classList.contains("paused"))
            return;
        if (this.autoplayInterval)
            clearInterval(this.autoplayInterval);
        this.autoplayInterval = setInterval(() => {
            if (this.disableAutoplay)
                return;
            this.nextSlide();
        }, this.duration);
    }
    stopAutoplay() {
        if (this.autoplayInterval)
            clearInterval(this.autoplayInterval);
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
        if (index === this.slides.length - 1)
            targetIndex = 0;
        this.resetSlides();
        this.slides[targetIndex].active = true;
        this.slides[targetIndex].scrollTo();
    }
    previousSlide() {
        this.disableAutoplayAction();
        const { index } = this.currentSlide;
        let targetIndex = index - 1;
        if (index - 1 < 0)
            targetIndex = this.slides.length - 1;
        this.resetSlides();
        this.slides[targetIndex].active = true;
        this.slides[targetIndex].scrollTo();
    }
    gotToSlide(index) {
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
    get slides() {
        const slides = this.querySelectorAll("[slide-index]");
        return slides;
    }
    get pagination() {
        return this.querySelector(`#carousel-pagination-${this.index}`);
    }
    get index() {
        const carousels = document.querySelectorAll(this.tagName);
        let index = 0;
        carousels.forEach((carousel, i) => {
            if (carousel === this)
                index = i;
        });
        return index;
    }
    get currentSlide() {
        var _a;
        let currentSlide = 0;
        (_a = this.slides) === null || _a === void 0 ? void 0 : _a.forEach((slide, index) => {
            if (slide.active)
                currentSlide = index;
        });
        return {
            index: currentSlide,
            element: this.slides[currentSlide],
        };
    }
    get playPauseButton() {
        return this.querySelector(".cc_con__btn--play-pause");
    }
    get duration() {
        return parseInt(this.getAttribute("duration"));
    }
    get autoplay() {
        return this.getAttribute("autoplay") === "true";
    }
    set autoplay(state) {
        this.setAttribute("autoplay", state.toString());
        if (state)
            this.startAutoplay();
        else
            this.stopAutoplay();
    }
}
export default Container;
//# sourceMappingURL=container.js.map