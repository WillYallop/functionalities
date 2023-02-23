import ProgressiveDetails from "./details";

class Disclosure extends ProgressiveDetails {
  initialised = false;
  group: string = "";
  duration: number = 200;
  closeSetTimeout?: ReturnType<typeof setTimeout>;
  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.initialised) {
      this.initialised = true;
      // Set state
      this.group = this.getAttribute("group") || "";
      this.duration = parseInt(this.getAttribute("duration") || "200");

      // unique id for element
      const id =
        this.summaryEle.id ||
        `d_${this.group}_${Math.random().toString(36).substring(2, 9)}`;

      // Attributes
      this.summaryEle.setAttribute("id", id);
      this.summaryEle.setAttribute("role", "button");
      this.content.setAttribute("role", "region");
      this.content.setAttribute("aria-labelledby", id);

      // Events
      this.detailEle.addEventListener("toggle", this.onToggle.bind(this));
      this.detailEle.addEventListener("click", this.detailsClick.bind(this));
      this.summaryEle.addEventListener("click", this.summaryClick.bind(this));
      this.content.addEventListener("click", this.contentClick.bind(this));

      // Styles
      this.content.style.transition = `max-height ${this.duration}ms ease-in-out`;
      this.content.style.overflow = "hidden";

      if (this.getAttribute("open") || this.detailEle.hasAttribute("open")) {
        this.content.style.maxHeight = `${this.content.scrollHeight}px`;
      } else {
        this.content.style.maxHeight = "0";
      }
    }
  }
  disconnectedCallback() {
    this.detailEle.removeEventListener("toggle", this.onToggle.bind(this));
    this.detailEle.removeEventListener("click", this.detailsClick.bind(this));
    this.summaryEle.removeEventListener("click", this.summaryClick.bind(this));
    this.content.removeEventListener("click", this.contentClick.bind(this));
  }
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(property, oldValue, newValue);

    if (property === "group") this.group = newValue;
    if (property === "duration") {
      this.duration = parseInt(newValue);
      this.content.style.transition = `max-height ${this.duration}ms ease-in-out`;
    }
  }
  static get observedAttributes() {
    return ["open", "group", "duration"];
  }
  // Methods
  detailsClick(e: Event) {
    e.preventDefault();
  }
  summaryClick(e: Event) {
    if (
      e.target === this.summaryEle ||
      this.summaryEle.contains(e.target as Node)
    ) {
      if (this.closeSetTimeout) clearTimeout(this.closeSetTimeout);

      if (this.getAttribute("open") === null) {
        this.setAttribute("open", "");
        this.content.style.maxHeight = `${this.content.scrollHeight}px`;
      } else {
        this.content.style.maxHeight = "0";
        this.closeSetTimeout = setTimeout(() => {
          this.removeAttribute("open");
        }, this.duration);
      }
    }
  }
  contentClick(e: Event) {
    e.stopPropagation();
  }
  onToggle() {
    super.onToggle();
    // Close other details that are in the same group
    if (this.getAttribute("open") === null) return;
    if (this.group) {
      const group = document.querySelectorAll(
        `[group="${this.group}"]`
      ) as NodeListOf<ProgressiveDetails>;

      group.forEach((detail) => {
        if (detail !== this) {
          if (detail.getAttribute("open") === null) return;
          else detail.querySelector("summary")?.click();
        }
      });
    }
  }
  open() {
    super.open();
  }
}

export default Disclosure;
