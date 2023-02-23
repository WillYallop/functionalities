class ProgressiveDetails extends HTMLElement {
    constructor() {
        super();
        this.initialised = false;
        this.disableWatch = false;
        this.detailEle = this.querySelector("details");
        this.summaryEle = this.querySelector("summary");
        this.content = this.summaryEle.nextElementSibling;
    }
    connectedCallback() {
        if (!this.initialised) {
            this.initialised = true;
            this.summaryEle.setAttribute("role", "button");
            this.detailEle.addEventListener("toggle", this.onToggle.bind(this));
            const closeOnLeave = this.getAttribute("close-on-leave");
            if (closeOnLeave === "true")
                this.detailEle.addEventListener("focusout", this.onFocusOut.bind(this));
        }
    }
    disconnectedCallback() {
        this.detailEle.removeEventListener("toggle", this.onToggle.bind(this));
        const closeOnLeave = this.getAttribute("close-on-leave");
        if (closeOnLeave === "true")
            this.detailEle.removeEventListener("focusout", this.onFocusOut.bind(this));
    }
    attributeChangedCallback(property, oldValue, newValue) {
        if (property === "open" && !this.disableWatch) {
            if (newValue === null)
                this.close();
            else
                this.open();
        }
    }
    static get observedAttributes() {
        return ["open"];
    }
    onFocusOut() {
        if (!this.detailEle.contains(document.activeElement)) {
            this.close();
        }
    }
    onToggle() {
        if (!this.animations)
            this.animations = this.content.getAnimations();
        if (this.detailEle.hasAttribute("open")) {
            this.animations.forEach((animation) => animation.cancel());
            this.animations.forEach((animation) => animation.play());
            this.open();
        }
        else {
            this.animations.forEach((animation) => animation.cancel());
            this.close();
        }
    }
    open() {
        this.disableWatch = true;
        this.detailEle.setAttribute("open", "");
        this.summaryEle.setAttribute("aria-expanded", "true");
        this.setAttribute("open", "");
        this.disableWatch = false;
    }
    close() {
        this.disableWatch = true;
        this.detailEle.removeAttribute("open");
        this.summaryEle.setAttribute("aria-expanded", "false");
        this.removeAttribute("open");
        this.disableWatch = false;
    }
}
export default ProgressiveDetails;
//# sourceMappingURL=progresive-detail.js.map