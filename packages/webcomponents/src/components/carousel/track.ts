import type Container from "./container";

class Track extends HTMLElement {
  dragging = false;
  dragStartX = 0;
  dragStartY = 0;
  dragEndX = 0;
  dragEndY = 0;
  constructor() {
    super();
  }
  connectedCallback() {
    this.container.track = this;
    this.initialAttributes();
    this.registerEvents();
  }
  disconnectedCallback() {
    this.removeEventListener("mousedown", this.onMouseDown.bind(this));
    this.removeEventListener("mouseup", this.onMouseUp.bind(this));
    this.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
    this.removeEventListener("touchstart", this.onTouchStart.bind(this));
    this.removeEventListener("touchend", this.onTouchEnd.bind(this));
    this.removeEventListener("touchcancel", this.onTouchCancel.bind(this));
  }
  // Init
  initialAttributes() {
    if (!this.id) {
      this.id = `carousel-track-${this.container.index}`;
    }
    this.setAttribute("role", "presentation");
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");
    this.setAttribute("tabindex", "-1");
    this.setAttribute("carousel-track", "");
  }
  registerEvents() {
    this.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    this.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.addEventListener("touchend", this.onTouchEnd.bind(this));
    this.addEventListener("touchcancel", this.onTouchCancel.bind(this));
  }
  // Events
  onMouseDown(e: MouseEvent) {
    this.dragStart(e.clientX, e.clientY);
  }
  onMouseUp(e: MouseEvent) {
    this.dragEnd(e.clientX, e.clientY);
  }
  onMouseLeave(e: MouseEvent) {
    this.dragEnd(e.clientX, e.clientY);
  }
  onTouchStart(e: TouchEvent) {
    this.dragStart(e.touches[0].clientX, e.touches[0].clientY);
  }
  onTouchEnd(e: TouchEvent) {
    this.dragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }
  onTouchCancel(e: TouchEvent) {
    this.dragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  }
  // Methods
  dragStart(clientX: number, clientY: number) {
    this.dragging = true;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
  }
  dragEnd(clientX: number, clientY: number) {
    if (!this.dragging) return;
    this.dragging = false;
    this.dragEndX = clientX;
    this.dragEndY = clientY;
    this.container.disableAutoplay = true;
    this.scrollToSlide();
  }
  scrollToSlide() {
    if (Math.abs(this.dragOffsetX) < 50 && Math.abs(this.dragOffsetY) < 50)
      return;

    // work out the slide direction based on the drag offset of x and y
    const directionX = this.dragOffsetX > 0 ? "left" : "right";
    const directionY = this.dragOffsetY > 0 ? "up" : "down";

    // if the drag offset of x is greater than the drag offset of y, then we are dragging horizontally
    // otherwise we are dragging vertically
    const direction =
      Math.abs(this.dragOffsetX) > Math.abs(this.dragOffsetY)
        ? directionX
        : directionY;

    if (direction === "left" || direction === "up") {
      this.container.previousSlide();
    }
    if (direction === "right" || direction === "down") {
      this.container.nextSlide();
    }
  }
  // Getters
  get container() {
    return this.parentElement as Container;
  }
  get slides() {
    return this.container.slides;
  }
  get dragOffsetX() {
    return this.dragEndX - this.dragStartX;
  }
  get dragOffsetY() {
    return this.dragEndY - this.dragStartY;
  }
}

export default Track;
