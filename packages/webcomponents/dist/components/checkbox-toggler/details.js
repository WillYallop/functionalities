class Details extends HTMLElement {
    constructor() {
        super();
        this.initialised = false;
        this.disableWatch = false;
        this.detailEle = this.querySelector("details");
        if (!this.detailEle) {
            throw new Error("Details element not found for details web component!");
        }
        this.summaryEle = this.querySelector("summary");
        if (!this.summaryEle) {
            throw new Error("Summary element not found for details web component!");
        }
        this.content = this.summaryEle.nextElementSibling;
        if (!this.content) {
            throw new Error("Details content element not found for details web component!");
        }
    }
    connectedCallback() {
        var _a;
        this.summaryEle.setAttribute("role", "button");
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.addEventListener("toggle", this.onToggle.bind(this));
        if (this.getAttribute("close-on-leave") === "true") {
            document.addEventListener("click", this.onFocusOut.bind(this));
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.removeEventListener("toggle", this.onToggle.bind(this));
        if (this.getAttribute("close-on-leave") === "true")
            document.addEventListener("click", this.onFocusOut.bind(this));
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
    onFocusOut(e) {
        if (!e.composedPath().includes(this)) {
            this.close();
        }
    }
    onToggle() {
        var _a;
        if ((_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.hasAttribute("open"))
            this.open();
        else
            this.close();
    }
    open() {
        var _a, _b;
        this.disableWatch = true;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.setAttribute("open", "");
        (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-expanded", "true");
        this.setAttribute("open", "");
        this.disableWatch = false;
    }
    close() {
        var _a, _b;
        this.disableWatch = true;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.removeAttribute("open");
        (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-expanded", "false");
        this.removeAttribute("open");
        this.disableWatch = false;
    }
}
export default Details;
//# sourceMappingURL=details.js.map