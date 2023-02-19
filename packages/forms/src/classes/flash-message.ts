export default class FlashMessage {
  element: HTMLElement;
  attributes: {
    message: string;
    close: string;
  };
  state: boolean;
  duration: number;
  constructor(selector: string, duration: number = 5000) {
    this.element = document.querySelector(selector) as HTMLElement;
    this.attributes = {
      close: "data-fm-close",
      message: "data-fm-message",
    };
    this.duration = duration;
    this.state = false;
    this.#initialise();
  }
  #initialise() {
    if (this.element) {
      const closeElements = this.element.querySelectorAll(
        `[${this.attributes.close}]`
      ) as NodeListOf<HTMLElement>;
      [...closeElements].forEach((ele) => {
        ele.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          (e.target as HTMLElement)?.blur();
          this.#toggle(false);
        });
      });
    }
  }
  #toggle(state: boolean) {
    if (this.element) {
      this.state = state;
      if (state) {
        this.element.classList.add("is-active");
        setTimeout(() => {
          this.#toggle(false);
        }, this.duration);
      } else {
        this.element.classList.remove("is-active");
      }
    }
  }
  // ------------------------------
  // public methods
  flash(message: string, success: boolean) {
    this.#toggle(true);
    const messageElement = this.element.querySelector(
      `[${this.attributes.message}]`
    ) as HTMLElement;
    if (messageElement) {
      messageElement.innerText = message;
    }
    if (success) {
      this.element.classList.add("is-success");
      this.element.classList.remove("is-error");
    } else {
      this.element.classList.add("is-error");
      this.element.classList.remove("is-success");
    }
  }
}
