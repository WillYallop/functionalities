const scrollTop = "sticky-top";
const moveDown = "sticky-down";
const moveUp = "sticky-up";

class StickyHeader extends HTMLElement {
  private triggerOffset: number = 0;
  private prevScrollPos: number = 0;
  private scrollPos: number = 0;
  private state: string = scrollTop;
  private prevState: string = this.state;
  constructor() {
    super();
  }
  // Hooks
  connectedCallback() {
    this.registerEvents();
    this.setState();
    this.setClass();
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this.onScroll.bind(this));
    if (!this.hasAttribute("trigger-offset")) {
      window.removeEventListener("resize", this.onResize.bind(this));
    }
    this.classList.remove(moveDown);
    this.classList.remove(moveUp);
    this.classList.remove(scrollTop);
  }
  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string
  ) {
    switch (property) {
      case "trigger-offset":
        this.triggerOffset = parseInt(newValue || "0");
        break;
    }
  }
  static get observedAttributes() {
    return ["trigger-offset"];
  }
  // Init
  private registerEvents() {
    window.addEventListener("scroll", this.onScroll.bind(this), {
      passive: true,
    });
    if (!this.hasAttribute("trigger-offset")) {
      window.addEventListener("resize", this.onResize.bind(this), {
        passive: true,
      });
    }
  }
  private setState() {
    // Set trigger distance
    if (this.hasAttribute("trigger-offset")) {
      this.triggerOffset = parseInt(this.getAttribute("trigger-offset") || "0");
    } else {
      this.triggerOffset = this.offsetHeight;
    }
    this.scrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;
    this.prevScrollPos = this.scrollPos;
    // set initial state
    if (this.scrollPos > this.triggerOffset) {
      this.state = moveDown;
    } else {
      this.state = scrollTop;
    }
    this.prevState = this.state;
  }
  // Events
  private onScroll() {
    this.scrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (this.scrollPos > this.triggerOffset) {
      if (this.scrollPos > this.prevScrollPos) {
        // Sticky down
        this.state = moveDown;
        this.prevScrollPos = this.scrollPos;
      } else {
        // Sticky up
        this.state = moveUp;
        this.prevScrollPos = this.scrollPos;
      }
    } else {
      this.state = scrollTop;
    }
    if (this.prevState != this.state) {
      this.prevState = this.state;
      this.setClass();
      // if this on-change attribute is set, call the function
      if (this.hasAttribute("on-change")) {
        const onChange = this.getAttribute("on-change");
        if (onChange) {
          // @ts-ignore
          if (typeof window[onChange] === "function") {
            // @ts-ignore
            window[onChange]({
              state: this.state,
              prevState: this.prevState,
              scrollPos: this.scrollPos,
            });
          }
        }
      }
    }
    // if this on-scroll attribute is set, call the function
    if (this.hasAttribute("on-scroll")) {
      const onScroll = this.getAttribute("on-scroll");
      if (onScroll) {
        // @ts-ignore
        if (typeof window[onScroll] === "function") {
          // @ts-ignore
          window[onScroll]({
            state: this.state,
            prevState: this.prevState,
            scrollPos: this.scrollPos,
          });
        }
      }
    }
  }
  private setClass() {
    if (this.state != moveDown) {
      this.classList.remove(moveDown);
      document.body.classList.remove(moveDown);
    }
    if (this.state != moveUp) {
      this.classList.remove(moveUp);
      document.body.classList.remove(moveUp);
    }
    if (this.state != scrollTop) {
      this.classList.remove(scrollTop);
      document.body.classList.remove(scrollTop);
    }
    this.classList.add(this.state);
    document.body.classList.add(this.state);
  }
  private onResize() {
    this.triggerOffset = this.offsetHeight;
  }
}

export default StickyHeader;
