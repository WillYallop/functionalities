class Track extends HTMLElement {
    constructor() {
        super();
        this.dragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragEndX = 0;
        this.dragEndY = 0;
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
    onMouseDown(e) {
        this.dragStart(e.clientX, e.clientY);
    }
    onMouseUp(e) {
        this.dragEnd(e.clientX, e.clientY);
    }
    onMouseLeave(e) {
        this.dragEnd(e.clientX, e.clientY);
    }
    onTouchStart(e) {
        this.dragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
    onTouchEnd(e) {
        this.dragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    onTouchCancel(e) {
        this.dragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    dragStart(clientX, clientY) {
        this.dragging = true;
        this.dragStartX = clientX;
        this.dragStartY = clientY;
    }
    dragEnd(clientX, clientY) {
        if (!this.dragging)
            return;
        this.dragging = false;
        this.dragEndX = clientX;
        this.dragEndY = clientY;
        this.container.disableAutoplay = true;
        this.scrollToSlide();
    }
    scrollToSlide() {
        if (Math.abs(this.dragOffsetX) < 50 && Math.abs(this.dragOffsetY) < 50)
            return;
        const directionX = this.dragOffsetX > 0 ? "left" : "right";
        const directionY = this.dragOffsetY > 0 ? "up" : "down";
        const direction = Math.abs(this.dragOffsetX) > Math.abs(this.dragOffsetY)
            ? directionX
            : directionY;
        if (direction === "left" || direction === "up") {
            this.container.previousSlide();
        }
        if (direction === "right" || direction === "down") {
            this.container.nextSlide();
        }
    }
    get container() {
        return this.parentElement;
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
//# sourceMappingURL=track.js.map