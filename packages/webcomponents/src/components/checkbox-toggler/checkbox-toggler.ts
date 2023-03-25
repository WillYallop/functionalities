class CheckboxToggler extends HTMLElement {
  private label: HTMLLabelElement | null;
  private checkbox: HTMLInputElement | null;
  private target: HTMLElement | null;
  constructor() {
    super();
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
    this.label?.removeEventListener("click", this.handleClick.bind(this));
    this.label?.removeEventListener("keydown", this.handleKeydown.bind(this));
  }
  // Init
  private setElements() {
    const id = this.getAttribute("data-id");
    this.label = document.querySelector(`label[for="${id}"]`);
    if (!this.label) {
      throw new Error(
        `Label not found for checkbox toggler web component with for attronite of "${id}".`
      );
    }
    this.checkbox = document.querySelector(`input[id="${id}"]`);
    if (!this.checkbox) {
      throw new Error(
        `Checkbox not found for checkbox toggler web component with ID of "${id}".`
      );
    }
    const targetID = this.getAttribute("data-target-id");
    if (targetID) {
      this.target = document.querySelector(`#${targetID}`);
      if (!this.target) {
        throw new Error(
          `Target not found for checkbox toggler web component with ID of "${targetID}".`
        );
      }
    }
  }
  private registerEvents() {
    this.label?.addEventListener("click", this.handleClick.bind(this));
    this.label?.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  private setAttributes() {
    this.label?.setAttribute("aria-expanded", "false");
    this.label?.setAttribute("tabindex", "0");
    this.label?.setAttribute("role", "button");
    const targetID = this.getAttribute("data-target-id");
    if (targetID) {
      this.label?.setAttribute("aria-controls", targetID);
    }
    if (this.checkbox?.checked) {
      this.label?.setAttribute("aria-expanded", "true");
    }
  }
  // Events
  private handleClick = (event: MouseEvent) => {
    event.preventDefault();
    this.toggleCheckbox();
  };
  private handleKeydown = (event: KeyboardEvent) => {
    // space or enter - not deprecated
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.toggleCheckbox();
    }
  };
  // Methods
  private toggleCheckbox() {
    if (this.checkbox) {
      this.checkbox.checked = !this.checkbox.checked;
      this.checkbox.dispatchEvent(new Event("change"));
      if (this.checkbox.checked) {
        this.label?.setAttribute("aria-expanded", "true");
      } else {
        this.label?.setAttribute("aria-expanded", "false");
      }
    }
  }
}
export default CheckboxToggler;
