const scrollTop = "sticky-top";
const moveDown = "sticky-down";
const moveUp = "sticky-up";

class StickyHeader extends HTMLElement {
  initialised = false;
  triggerOffset: number = 0;
  prevScrollPos: number = 0;
  scrollPos: number = 0;
  state: string = scrollTop;
  prevState: string = this.state;
  constructor() {
    super();
  }
  // Hooks
  connectedCallback() {
    if (!this.initialised) {
      // Set state
      this.initialised = true;
      // Set trigger distance
      if (this.hasAttribute("trigger-offset")) {
        this.triggerOffset = parseInt(
          this.getAttribute("trigger-offset") || "0"
        );
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
      this.setClass();
      // Events
      window.addEventListener("scroll", this.onScroll.bind(this), {
        passive: true,
      });
      // if this doesnt have trigger-offset attribute
      if (!this.hasAttribute("trigger-offset")) {
        window.addEventListener("resize", this.onResize.bind(this), {
          passive: true,
        });
      }
    }
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
    if (property === "trigger-offset") {
      this.triggerOffset = parseInt(newValue || "0");
    }
  }
  static get observedAttributes() {
    return ["trigger-offset"];
  }
  // Methods
  onScroll() {
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
  setClass() {
    // Remove
    if (this.state != moveDown) {
      this.classList.remove(moveDown);
    }
    if (this.state != moveUp) {
      this.classList.remove(moveUp);
    }
    if (this.state != scrollTop) {
      this.classList.remove(scrollTop);
    }
    // Add
    this.classList.add(this.state);
  }
  onResize() {
    this.triggerOffset = this.offsetHeight;
  }
}

export default StickyHeader;
