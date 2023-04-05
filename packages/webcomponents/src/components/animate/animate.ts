type on = "visible" | "load";

class Animate extends HTMLElement {
  observer: IntersectionObserver | null = null;
  constructor() {
    super();
  }
  connectedCallback() {
    this.animateAttribute = false;
    this.type = this.type;
    this.delay = this.delay;
    this.threshhold = this.threshhold;
    this.reset = this.reset;
    this.setStyle();
    if (this.on === "load") {
      this.animateAttribute = true;
    } else if (this.on === "visible") {
      this.registerObserver();
    }
  }
  disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
  }
  // Inti
  setStyle() {
    this.style.animationDelay = `${this.delay}ms`;
  }
  registerObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: this.threshhold,
    };
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this);
  }
  // Methods
  handleObserver(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateAttribute = true;
        if (!this.reset) this.observer?.disconnect();
      } else {
        if (this.reset) this.animateAttribute = false;
      }
    });
  }
  // Getters
  get animateAttribute() {
    return this.getAttribute("animate") === "true";
  }
  get on() {
    const attribute = this.getAttribute("on");
    let value: on = "visible";
    if (attribute === "load") value = "load";
    this.on = value;
    return value;
  }
  get type() {
    return this.getAttribute("type") || "fade-in";
  }
  get delay() {
    return parseInt(this.getAttribute("delay") || "0");
  }
  get threshhold() {
    return parseFloat(this.getAttribute("threshhold") || "0.2");
  }
  get reset() {
    return this.getAttribute("reset") === "true";
  }
  // Setters\
  set animateAttribute(value: boolean) {
    console.log("animateAttribute", value);
    this.setAttribute("animate", value.toString());
  }
  set on(value: on) {
    this.setAttribute("on", value);
  }
  set type(value: string) {
    this.setAttribute("type", value);
  }
  set delay(value: number) {
    this.setAttribute("delay", value.toString());
  }
  set threshhold(value: number) {
    this.setAttribute("threshhold", value.toString());
  }
  set reset(value: boolean) {
    this.setAttribute("reset", value.toString());
  }
}

export default Animate;
