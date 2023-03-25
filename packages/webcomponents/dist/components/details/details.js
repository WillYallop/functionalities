class Details extends HTMLElement {
    constructor() {
        super();
        this.disableWatch = false;
        this.detailEle = null;
        this.summaryEle = null;
        this.content = null;
    }
    connectedCallback() {
        this.setElements();
        this.registerEvents();
        this.setAttributes();
        this.setState();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.removeEventListener("toggle", this.onToggle.bind(this));
        if (this.getAttribute("close-on-leave") === "true")
            document.addEventListener("click", this.onFocusOut.bind(this));
    }
    attributeChangedCallback(property, oldValue, newValue) {
        switch (property) {
            case "open": {
                if (!this.disableWatch) {
                    if (newValue === null)
                        this.close();
                    else
                        this.open();
                }
            }
        }
    }
    static get observedAttributes() {
        return ["open", "close-on-leave"];
    }
    setElements() {
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
    registerEvents() {
        var _a;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.addEventListener("toggle", this.onToggle.bind(this));
        if (this.getAttribute("close-on-leave") === "true") {
            document.addEventListener("click", this.onFocusOut.bind(this));
        }
    }
    setState() {
        var _a;
        if (this.hasAttribute("open") || ((_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.hasAttribute("open")))
            this.open();
    }
    setAttributes() {
        var _a;
        (_a = this.summaryEle) === null || _a === void 0 ? void 0 : _a.setAttribute("role", "button");
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