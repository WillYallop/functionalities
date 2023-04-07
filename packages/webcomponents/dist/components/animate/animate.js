class Animate extends HTMLElement {
    constructor() {
        super();
        this.observer = null;
    }
    connectedCallback() {
        this.animateAttribute = false;
        this.type = this.type;
        this.delay = this.delay;
        this.threshhold = this.threshhold;
        this.reset = this.reset;
        this.setStyle();
        if (this.on === "load") {
            this.animateAttribute = true;
        }
        else if (this.on === "visible") {
            this.registerObserver();
        }
    }
    disconnectedCallback() {
        if (this.observer)
            this.observer.disconnect();
    }
    setStyle() {
        this.style.animationDelay = `${this.delay}ms`;
    }
    registerObserver() {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: this.threshhold,
        };
        this.observer = new IntersectionObserver(this.handleObserver.bind(this), options);
        this.observer.observe(this);
    }
    handleObserver(entries) {
        entries.forEach((entry) => {
            var _a;
            if (entry.isIntersecting) {
                this.animateAttribute = true;
                if (!this.reset)
                    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
            }
            else {
                if (this.reset)
                    this.animateAttribute = false;
            }
        });
    }
    get animateAttribute() {
        return this.getAttribute("animate") === "true";
    }
    get on() {
        const attribute = this.getAttribute("on");
        let value = "visible";
        if (attribute === "load")
            value = "load";
        this.on = value;
        return value;
    }
    get type() {
        return this.getAttribute("type") || "fade-in";
    }
    get delay() {
        return parseInt(this.getAttribute("delay") || "0");
    }
    get threshhold() {
        return parseFloat(this.getAttribute("threshhold") || "0.2");
    }
    get reset() {
        return this.getAttribute("reset") === "true";
    }
    set animateAttribute(value) {
        this.setAttribute("animate", value.toString());
    }
    set on(value) {
        this.setAttribute("on", value);
    }
    set type(value) {
        this.setAttribute("type", value);
    }
    set delay(value) {
        this.setAttribute("delay", value.toString());
    }
    set threshhold(value) {
        this.setAttribute("threshhold", value.toString());
    }
    set reset(value) {
        this.setAttribute("reset", value.toString());
    }
}
export default Animate;
//# sourceMappingURL=animate.js.map