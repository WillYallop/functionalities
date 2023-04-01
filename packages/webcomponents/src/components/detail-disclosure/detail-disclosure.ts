class DetailDisclosure extends HTMLElement {
  private detailEle: HTMLDetailsElement | null;
  private summaryEle: HTMLElement | null;
  private content: HTMLElement | null;
  private disableWatch = false;
  private group: string = "";
  private duration: number = 200;
  private closeSetTimeout?: ReturnType<typeof setTimeout>;
  private state = false;
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
    this.setState();
    this.setAttributes();
    this.setStyle();
  }
  disconnectedCallback() {
    this.detailEle?.removeEventListener("click", this.detailsClick.bind(this));
    this.summaryEle?.removeEventListener("click", this.summaryClick.bind(this));
    this.content?.removeEventListener("click", this.contentClick.bind(this));
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
    this.detailEle?.addEventListener("click", this.detailsClick.bind(this));
    this.summaryEle?.addEventListener("click", this.summaryClick.bind(this));
    this.content?.addEventListener("click", this.contentClick.bind(this));
  }
  private setState() {
    this.group = this.getAttribute("group") || "";
    this.duration = parseInt(this.getAttribute("duration") || "200");
    if (this.hasAttribute("open") || this.detailEle?.hasAttribute("open"))
      this.open();
  }
  private setAttributes() {
    const id =
      this.summaryEle?.id ||
      `d_${this.group}_${Math.random().toString(36).substring(2, 9)}`;

    this.summaryEle?.setAttribute("id", id);
    this.summaryEle?.setAttribute("role", "button");
    this.content?.setAttribute("role", "region");
    this.content?.setAttribute("aria-labelledby", id);
  }
  private setStyle() {
    if (this.content) {
      this.content.style.transition = `max-height ${this.duration}ms ease-in-out`;
      this.content.style.overflow = "hidden";
      if (this.hasAttribute("open") || this.detailEle?.hasAttribute("open")) {
        this.content.style.maxHeight = `${this.content.scrollHeight}px`;
      } else {
        this.content.style.maxHeight = "0";
      }
    }
  }
  // Events
  private detailsClick(e: Event) {
    e.preventDefault();
  }
  private summaryClick(e: Event) {
    if (
      e.target === this.summaryEle ||
      this.summaryEle?.contains(e.target as Node)
    ) {
      if (this.closeSetTimeout) clearTimeout(this.closeSetTimeout);
      // Toggle
      if (this.state) this.close();
      else this.open();
    }
  }
  private contentClick(e: Event) {
    e.stopPropagation();
  }
  // Methods
  private open() {
    this.disableWatch = true;

    this.state = true;
    this.detailEle?.setAttribute("open", "");
    this.summaryEle?.setAttribute("aria-expanded", "true");
    this.setAttribute("open", "");

    if (this.content)
      this.content.style.maxHeight = `${this.content.scrollHeight}px`;

    this.toggleGroup();
    this.disableWatch = false;
  }
  private close() {
    this.disableWatch = true;

    this.state = false;
    if (this.content) this.content.style.maxHeight = "0";

    this.closeSetTimeout = setTimeout(() => {
      this.detailEle?.removeAttribute("open");
      this.removeAttribute("open");
      this.summaryEle?.setAttribute("aria-expanded", "false");
      this.disableWatch = false;
    }, this.duration);
  }
  private toggleGroup() {
    if (this.group) {
      const group = document.querySelectorAll(
        `[group="${this.group}"]`
      ) as NodeListOf<DetailDisclosure>;

      group.forEach((detail) => {
        if (detail !== this) {
          if (!detail.hasAttribute("open")) return;
          else detail.querySelector("summary")?.click();
        }
      });
    }
  }
}

export default DetailDisclosure;
