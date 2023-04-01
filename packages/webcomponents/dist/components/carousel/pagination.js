class Pagination extends HTMLElement {
    constructor() {
        super();
        this.updateTimeout = null;
    }
    connectedCallback() {
        this.render();
        this.initialAttributes();
        this.registerEvents();
    }
    disconnectedCallback() {
        this.buttons.forEach((button) => {
            button.removeEventListener("click", this.buttonClick.bind(this));
            button.removeEventListener("keydown", this.buttonKeyDown.bind(this));
        });
    }
    render() {
        const ul = document.createElement("ul");
        ul.classList.add("cp-con");
        this.track.slides.forEach(() => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            li.classList.add("cp-con__li");
            button.classList.add("cp-con__li__btn");
            li.appendChild(button);
            ul.appendChild(li);
        });
        this.appendChild(ul);
    }
    initialAttributes() {
        var _a, _b;
        if (!this.id) {
            this.id = `carousel-pagination-${this.container.index}`;
        }
        (_a = this.ul) === null || _a === void 0 ? void 0 : _a.setAttribute("role", "tablist");
        (_b = this.ul) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-label", "Select a slide to show");
        this.listItems.forEach((listItem) => {
            listItem.setAttribute("role", "presentation");
        });
        this.buttons.forEach((button, index) => {
            button.setAttribute("role", "tab");
            button.setAttribute("aria-controls", this.track.slides[index].id);
            button.setAttribute("aria-label", `Slide ${index + 1}`);
            button.setAttribute("type", "button");
            this.updateState(index);
        });
    }
    registerEvents() {
        this.buttons.forEach((button) => {
            button.addEventListener("click", this.buttonClick.bind(this));
            button.addEventListener("keydown", this.buttonKeyDown.bind(this));
        });
    }
    updateState(index) {
        const button = this.buttons[index];
        if (this.track.slides[index].active) {
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            button.removeAttribute("tabindex");
        }
        else {
            button.classList.remove("active");
            button.setAttribute("aria-selected", "false");
            button.setAttribute("tabindex", "-1");
        }
    }
    buttonClick(e) {
        const button = e.target;
        const index = Array.from(this.buttons).indexOf(button);
        this.track.container.gotToSlide(index);
        this.updateState(index);
        this.buttons.forEach((button, i) => {
            if (i !== index) {
                this.updateState(i);
            }
        });
    }
    buttonKeyDown(e) {
        if (e.key === "ArrowLeft") {
            const button = e.target;
            const index = Array.from(this.buttons).indexOf(button);
            if (index > 0) {
                this.track.container.gotToSlide(index - 1);
                this.updateState(index - 1);
                this.updateState(index);
                this.buttons[index - 1].focus();
            }
        }
        if (e.key === "ArrowRight") {
            const button = e.target;
            const index = Array.from(this.buttons).indexOf(button);
            if (index < this.buttons.length - 1) {
                this.track.container.gotToSlide(index + 1);
                this.updateState(index + 1);
                this.updateState(index);
                this.buttons[index + 1].focus();
            }
        }
    }
    update() {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(() => {
            this.buttons.forEach((button, index) => {
                this.updateState(index);
            });
        }, 200);
    }
    get container() {
        return this.parentElement;
    }
    get track() {
        return this.container.track;
    }
    get ul() {
        return this.querySelector("ul");
    }
    get listItems() {
        return this.querySelectorAll("li");
    }
    get buttons() {
        return this.querySelectorAll("button");
    }
}
export default Pagination;
//# sourceMappingURL=pagination.js.map