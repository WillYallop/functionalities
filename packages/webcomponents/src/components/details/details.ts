class Details extends HTMLElement {
  private detailEle: HTMLDetailsElement | null;
  private summaryEle: HTMLElement | null;
  private content: HTMLElement | null;
  private disableWatch = false;
  constructor() {
    super();
    this.detailEle = null;
    this.summaryEle = null;
    this.content = null;
  }
  // Hooks
  connectedCallback() {
    this.setElements();
    this.registerEvents();
    this.setAttributes();
    this.setState();
  }
  disconnectedCallback() {
    this.detailEle?.removeEventListener("toggle", this.onToggle.bind(this));
    if (this.getAttribute("close-on-leave") === "true")
      document.addEventListener("click", this.onFocusOut.bind(this));
  }
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    switch (property) {
      case "open": {
        if (!this.disableWatch) {
          if (newValue === null) this.close();
          else this.open();
        }
      }
    }
  }
  static get observedAttributes() {
    return ["open", "close-on-leave"];
  }
  // Init
  private setElements() {
    this.detailEle = this.querySelector("details") as HTMLDetailsElement;
    if (!this.detailEle) {
      throw new Error("Details element not found for details web component!");
    }
    this.summaryEle = this.querySelector("summary") as HTMLElement;
    if (!this.summaryEle) {
      throw new Error("Summary element not found for details web component!");
    }
    this.content = this.summaryEle.nextElementSibling as HTMLElement;
    if (!this.content) {
      throw new Error(
        "Details content element not found for details web component!"
      );
    }
  }
  private registerEvents() {
    this.detailEle?.addEventListener("toggle", this.onToggle.bind(this));
    if (this.getAttribute("close-on-leave") === "true") {
      document.addEventListener("click", this.onFocusOut.bind(this));
    }
  }
  private setState() {
    if (this.hasAttribute("open") || this.detailEle?.hasAttribute("open"))
      this.open();
  }
  private setAttributes() {
    this.summaryEle?.setAttribute("role", "button");
  }
  // Events
  private onFocusOut(e: Event) {
    if (!e.composedPath().includes(this)) {
      this.close();
    }
  }
  private onToggle() {
    if (this.detailEle?.hasAttribute("open")) this.open();
    else this.close();
  }
  // Methods
  private open() {
    this.disableWatch = true;
    this.detailEle?.setAttribute("open", "");
    this.summaryEle?.setAttribute("aria-expanded", "true");
    this.setAttribute("open", "");
    this.disableWatch = false;
  }
  private close() {
    this.disableWatch = true;
    this.detailEle?.removeAttribute("open");
    this.summaryEle?.setAttribute("aria-expanded", "false");
    this.removeAttribute("open");
    this.disableWatch = false;
  }
}

export default Details;
