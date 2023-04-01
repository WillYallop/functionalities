class Slide extends HTMLElement {
    constructor() {
        super();
        this.scrollTimeout = null;
    }
    connectedCallback() {
        this.initialAttributes();
        this.registerObserver();
    }
    initialAttributes() {
        const slideIndex = Array.from(this.track.slides).indexOf(this);
        if (!this.id) {
            this.id = `carousel-slide-${this.track.container.index}-${Math.random()
                .toString(36)
                .substring(2, 9)}`;
        }
        this.setAttribute("role", "tabpanel");
        this.setAttribute("aria-roledescription", "slide");
        this.setAttribute("aria-label", `${slideIndex + 1} of ${this.track.slides.length}`);
        this.setAttribute("slide-index", `${slideIndex}`);
        this.updateAttributes(this.active);
    }
    registerObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                this.active = entry.isIntersecting;
            });
        }, {
            root: this.track,
            rootMargin: "0px",
            threshold: 0.5,
        });
        observer.observe(this);
    }
    updateAttributes(state) {
        if (state) {
            this.setAttribute("aria-hidden", "false");
            this.setAttribute("active", "true");
        }
        else {
            this.setAttribute("aria-hidden", "true");
            this.setAttribute("active", "false");
        }
    }
    scrollTo() {
        if (this.scrollTimeout)
            clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            const offsetLeft = this.offsetLeft - this.track.offsetLeft;
            const offsetTop = this.offsetTop - this.track.offsetTop;
            this.track.scrollTo(offsetLeft, offsetTop);
        });
    }
    get track() {
        return this.parentElement;
    }
    get active() {
        return this.getAttribute("active") === "true";
    }
    get index() {
        return parseInt(this.getAttribute("slide-index") || "0", 10);
    }
    set active(state) {
        if (state === this.active)
            return;
        this.updateAttributes(state);
        this.track.container.pagination.update();
    }
}
export default Slide;
//# sourceMappingURL=slide.js.map