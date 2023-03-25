class Disclosure extends HTMLElement {
    constructor() {
        super();
        this.disableWatch = false;
        this.group = "";
        this.duration = 200;
        this.state = false;
        this.detailEle = null;
        this.summaryEle = null;
        this.content = null;
    }
    connectedCallback() {
        this.setElements();
        this.registerEvents();
        this.setState();
        this.setAttributes();
        this.setStyle();
    }
    disconnectedCallback() {
        var _a, _b, _c;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.detailsClick.bind(this));
        (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", this.summaryClick.bind(this));
        (_c = this.content) === null || _c === void 0 ? void 0 : _c.removeEventListener("click", this.contentClick.bind(this));
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
                break;
            }
            case "group": {
                this.group = newValue;
                break;
            }
            case "duration": {
                this.duration = parseInt(newValue);
                if (this.content)
                    this.content.style.transition = `max-height ${this.duration}ms ease-in-out`;
                break;
            }
        }
    }
    static get observedAttributes() {
        return ["open", "group", "duration"];
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
        var _a, _b, _c;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.detailsClick.bind(this));
        (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.summaryClick.bind(this));
        (_c = this.content) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.contentClick.bind(this));
    }
    setState() {
        var _a;
        this.group = this.getAttribute("group") || "";
        this.duration = parseInt(this.getAttribute("duration") || "200");
        if (this.hasAttribute("open") || ((_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.hasAttribute("open")))
            this.open();
    }
    setAttributes() {
        var _a, _b, _c, _d, _e;
        const id = ((_a = this.summaryEle) === null || _a === void 0 ? void 0 : _a.id) ||
            `d_${this.group}_${Math.random().toString(36).substring(2, 9)}`;
        (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.setAttribute("id", id);
        (_c = this.summaryEle) === null || _c === void 0 ? void 0 : _c.setAttribute("role", "button");
        (_d = this.content) === null || _d === void 0 ? void 0 : _d.setAttribute("role", "region");
        (_e = this.content) === null || _e === void 0 ? void 0 : _e.setAttribute("aria-labelledby", id);
    }
    setStyle() {
        var _a;
        if (this.content) {
            this.content.style.transition = `max-height ${this.duration}ms ease-in-out`;
            this.content.style.overflow = "hidden";
            if (this.hasAttribute("open") || ((_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.hasAttribute("open"))) {
                this.content.style.maxHeight = `${this.content.scrollHeight}px`;
            }
            else {
                this.content.style.maxHeight = "0";
            }
        }
    }
    detailsClick(e) {
        e.preventDefault();
    }
    summaryClick(e) {
        var _a;
        if (e.target === this.summaryEle ||
            ((_a = this.summaryEle) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            if (this.closeSetTimeout)
                clearTimeout(this.closeSetTimeout);
            if (this.state)
                this.close();
            else
                this.open();
        }
    }
    contentClick(e) {
        e.stopPropagation();
    }
    open() {
        var _a, _b;
        this.disableWatch = true;
        this.state = true;
        (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.setAttribute("open", "");
        (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-expanded", "true");
        this.setAttribute("open", "");
        if (this.content)
            this.content.style.maxHeight = `${this.content.scrollHeight}px`;
        this.toggleGroup();
        this.disableWatch = false;
    }
    close() {
        this.disableWatch = true;
        this.state = false;
        if (this.content)
            this.content.style.maxHeight = "0";
        this.closeSetTimeout = setTimeout(() => {
            var _a, _b;
            (_a = this.detailEle) === null || _a === void 0 ? void 0 : _a.removeAttribute("open");
            this.removeAttribute("open");
            (_b = this.summaryEle) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-expanded", "false");
            this.disableWatch = false;
        }, this.duration);
    }
    toggleGroup() {
        if (this.group) {
            const group = document.querySelectorAll(`[group="${this.group}"]`);
            group.forEach((detail) => {
                var _a;
                if (detail !== this) {
                    if (!detail.hasAttribute("open"))
                        return;
                    else
                        (_a = detail.querySelector("summary")) === null || _a === void 0 ? void 0 : _a.click();
                }
            });
        }
    }
}
export default Disclosure;
//# sourceMappingURL=disclosure.js.map