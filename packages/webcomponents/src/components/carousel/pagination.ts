import type Container from "./container";
import type Track from "./track";

class Pagination extends HTMLElement {
  updateTimeout: ReturnType<typeof setTimeout> | null = null;
  constructor() {
    super();
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
  // Init
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
    if (!this.id) {
      this.id = `carousel-pagination-${this.container.index}`;
    }

    this.ul?.setAttribute("role", "tablist");
    this.ul?.setAttribute("aria-label", "Select a slide to show");
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
  updateState(index: number) {
    const button = this.buttons[index];
    if (this.track.slides[index].active) {
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
      button.removeAttribute("tabindex");
    } else {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
      button.setAttribute("tabindex", "-1");
    }
  }
  // Events
  buttonClick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    const index = Array.from(this.buttons).indexOf(button);
    this.track.container.gotToSlide(index);
    this.updateState(index);
    // reset others
    this.buttons.forEach((button, i) => {
      if (i !== index) {
        this.updateState(i);
      }
    });
  }
  buttonKeyDown(e: KeyboardEvent) {
    // on left arrow key - not deprecated
    if (e.key === "ArrowLeft") {
      const button = e.target as HTMLButtonElement;
      const index = Array.from(this.buttons).indexOf(button);
      if (index > 0) {
        this.track.container.gotToSlide(index - 1);
        this.updateState(index - 1);
        this.updateState(index);
        this.buttons[index - 1].focus();
      }
    }
    // on right arrow key - not deprecated
    if (e.key === "ArrowRight") {
      const button = e.target as HTMLButtonElement;
      const index = Array.from(this.buttons).indexOf(button);
      if (index < this.buttons.length - 1) {
        this.track.container.gotToSlide(index + 1);
        this.updateState(index + 1);
        this.updateState(index);
        this.buttons[index + 1].focus();
      }
    }
  }
  // methods
  update() {
    // wait for the track scroll to finish
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
    this.updateTimeout = setTimeout(() => {
      this.buttons.forEach((button, index) => {
        this.updateState(index);
      });
    }, 300);
  }
  // Getters
  get container() {
    return this.parentElement as Container;
  }
  get track() {
    return this.container.track as Track;
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
