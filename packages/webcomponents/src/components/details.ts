class Details extends HTMLElement {
  detailEle: HTMLDetailsElement;
  summaryEle: HTMLElement;
  content: HTMLElement;
  animations?: Animation[];
  initialised = false;
  disableWatch = false;
  constructor() {
    super();
    this.detailEle = this.querySelector("details") as HTMLDetailsElement;
    if (!this.detailEle)
      throw new Error("Details element not found for details web component!");
    this.summaryEle = this.querySelector("summary") as HTMLElement;
    if (!this.summaryEle)
      throw new Error("Summary element not found for details web component!");
    this.content = this.summaryEle.nextElementSibling as HTMLElement;
    if (!this.content)
      throw new Error(
        "Details content element not found for details web component!"
      );
  }
  connectedCallback() {
    if (!this.initialised) {
      this.initialised = true;
      // Attributes
      this.summaryEle.setAttribute("role", "button");
      // Events
      this.detailEle.addEventListener("toggle", this.onToggle.bind(this));
      const closeOnLeave = this.getAttribute("close-on-leave");
      if (closeOnLeave === "true") {
        document.addEventListener("click", this.onFocusOut.bind(this));
      }
    }
  }
  disconnectedCallback() {
    this.detailEle.removeEventListener("toggle", this.onToggle.bind(this));
    const closeOnLeave = this.getAttribute("close-on-leave");
    if (closeOnLeave === "true")
      document.addEventListener("click", this.onFocusOut.bind(this));
  }
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    if (property === "open" && !this.disableWatch) {
      if (newValue === null) this.close();
      else this.open();
    }
  }
  static get observedAttributes() {
    return ["open"];
  }
  // Methods
  onFocusOut(e: Event) {
    if (!e.composedPath().includes(this)) {
      this.close();
    }
  }
  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();
    if (this.detailEle.hasAttribute("open")) {
      this.animations.forEach((animation) => animation.cancel());
      this.animations.forEach((animation) => animation.play());
      this.open();
    } else {
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

export default Details;
