class CheckboxToggler extends HTMLElement {
    constructor() {
        super();
        this.handleClick = (event) => {
            event.preventDefault();
            this.toggleCheckbox();
        };
        this.handleKeydown = (event) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                this.toggleCheckbox();
            }
        };
        this.label = null;
        this.checkbox = null;
        this.target = null;
    }
    connectedCallback() {
        this.setElements();
        this.registerEvents();
        this.setAttributes();
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.label) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this.handleClick.bind(this));
        (_b = this.label) === null || _b === void 0 ? void 0 : _b.removeEventListener("keydown", this.handleKeydown.bind(this));
        if (this.hasAttribute("close-on-leave")) {
            document.removeEventListener("click", this.onFocusOut.bind(this));
        }
        if (this.hasAttribute("open-on-hover")) {
            this === null || this === void 0 ? void 0 : this.removeEventListener("mouseenter", this.onHoverIn.bind(this));
            this === null || this === void 0 ? void 0 : this.removeEventListener("mouseleave", this.onHoverOut.bind(this));
        }
        if (this.hasAttribute("open-on-focus")) {
            this === null || this === void 0 ? void 0 : this.removeEventListener("focusin", this.onHoverIn.bind(this));
            this === null || this === void 0 ? void 0 : this.removeEventListener("focusout", this.onHoverOut.bind(this));
        }
    }
    setElements() {
        const id = this.getAttribute("input-id");
        this.label = document.querySelector(`label[for="${id}"]`);
        if (!this.label) {
            throw new Error(`Label not found for checkbox toggler web component with for attronite of "${id}".`);
        }
        this.checkbox = document.querySelector(`input[id="${id}"]`);
        if (!this.checkbox) {
            throw new Error(`Checkbox not found for checkbox toggler web component with ID of "${id}".`);
        }
        const targetID = this.getAttribute("target-id");
        if (targetID) {
            this.target = document.querySelector(`#${targetID}`);
            if (!this.target) {
                throw new Error(`Target not found for checkbox toggler web component with ID of "${targetID}".`);
            }
        }
    }
    registerEvents() {
        var _a, _b;
        (_a = this.label) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.handleClick.bind(this));
        (_b = this.label) === null || _b === void 0 ? void 0 : _b.addEventListener("keydown", this.handleKeydown.bind(this));
        if (this.hasAttribute("close-on-leave")) {
            document.addEventListener("click", this.onFocusOut.bind(this));
        }
        if (this.hasAttribute("open-on-hover")) {
            this === null || this === void 0 ? void 0 : this.addEventListener("mouseenter", this.onHoverIn.bind(this));
            this === null || this === void 0 ? void 0 : this.addEventListener("mouseleave", this.onHoverOut.bind(this));
        }
        if (this.hasAttribute("open-on-focus")) {
            this === null || this === void 0 ? void 0 : this.addEventListener("focusin", this.onHoverIn.bind(this));
            this === null || this === void 0 ? void 0 : this.addEventListener("focusout", this.onHoverOut.bind(this));
        }
    }
    setAttributes() {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.label) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-expanded", "false");
        (_b = this.label) === null || _b === void 0 ? void 0 : _b.setAttribute("tabindex", "0");
        (_c = this.label) === null || _c === void 0 ? void 0 : _c.setAttribute("role", "button");
        const targetID = this.getAttribute("data-target-id");
        if (targetID) {
            (_d = this.label) === null || _d === void 0 ? void 0 : _d.setAttribute("aria-controls", targetID);
        }
        if ((_e = this.checkbox) === null || _e === void 0 ? void 0 : _e.checked) {
            (_f = this.label) === null || _f === void 0 ? void 0 : _f.setAttribute("aria-expanded", "true");
        }
    }
    onFocusOut(e) {
        var _a;
        if (!e.composedPath().includes(this)) {
            if ((_a = this.checkbox) === null || _a === void 0 ? void 0 : _a.checked)
                this.toggleCheckbox();
        }
    }
    onHoverIn(e) {
        var _a;
        if (!((_a = this.checkbox) === null || _a === void 0 ? void 0 : _a.checked))
            this.toggleCheckbox();
    }
    onHoverOut(e) {
        var _a;
        if ((_a = this.checkbox) === null || _a === void 0 ? void 0 : _a.checked)
            this.toggleCheckbox();
    }
    toggleCheckbox() {
        var _a, _b;
        if (this.checkbox) {
            this.checkbox.checked = !this.checkbox.checked;
            this.checkbox.dispatchEvent(new Event("change"));
            const bodyclass = this.getAttribute("body-class");
            if (this.checkbox.checked) {
                (_a = this.label) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-expanded", "true");
                if (bodyclass)
                    document.body.classList.add(bodyclass);
            }
            else {
                (_b = this.label) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-expanded", "false");
                if (bodyclass)
                    document.body.classList.remove(bodyclass);
            }
        }
    }
}
export default CheckboxToggler;
//# sourceMappingURL=checkbox-toggler.js.map