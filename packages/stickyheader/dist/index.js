export default class StickyHeader {
    config;
    headerEle;
    scrollPos;
    prevScrollPos;
    state;
    prevState;
    onScroll;
    onScrollHandler;
    constructor(id, config) {
        this.config = {
            triggerDistance: config?.triggerDistance || 50,
            classes: {
                top: config?.classes?.top || "sticky-top",
                movedDown: config?.classes?.movedDown || "sticky-down",
                movedUp: config?.classes?.movedUp || "sticky-up",
            },
            onChange: config?.onChange || undefined,
        };
        this.scrollPos =
            document.body.scrollTop || document.documentElement.scrollTop;
        this.prevScrollPos = this.scrollPos;
        this.state = undefined;
        this.prevState = undefined;
        this.headerEle = document.getElementById(id);
        if (this.headerEle !== undefined) {
            this.onScroll = function () {
                this.scrollPos =
                    document.body.scrollTop || document.documentElement.scrollTop;
                if (this.scrollPos > this.config.triggerDistance) {
                    if (this.scrollPos > this.prevScrollPos) {
                        this.state = this.config.classes.movedDown;
                        this.prevScrollPos = this.scrollPos;
                    }
                    else {
                        this.state = this.config.classes.movedUp;
                        this.prevScrollPos = this.scrollPos;
                    }
                }
                else {
                    this.state = this.config.classes.top;
                }
                if (this.prevState != this.state) {
                    this.prevState = this.state;
                    if (this.state != this.config.classes.movedDown) {
                        this.headerEle.classList.remove(this.config.classes.movedDown);
                    }
                    if (this.state != this.config.classes.movedUp) {
                        this.headerEle.classList.remove(this.config.classes.movedUp);
                    }
                    if (this.state != this.config.classes.top) {
                        this.headerEle.classList.remove(this.config.classes.top);
                    }
                    this.headerEle.classList.add(this.state);
                    if (this.config.onChange != undefined) {
                        this.config.onChange({
                            state: this.state,
                            scrollPos: this.scrollPos,
                        });
                    }
                }
            };
            this.onScrollHandler = this.onScroll.bind(this);
            this.onScrollHandler();
            window.addEventListener("scroll", this.onScrollHandler, true);
        }
        else
            console.error(`Header with an ID of ${id} cannot be found!`);
    }
    destroy() {
        if (this.onScrollHandler)
            window.removeEventListener("scroll", this.onScrollHandler, true);
        this.headerEle.classList.remove(this.config.classes.movedDown);
        this.headerEle.classList.remove(this.config.classes.movedUp);
        this.headerEle.classList.remove(this.config.classes.top);
    }
}
//# sourceMappingURL=index.js.map