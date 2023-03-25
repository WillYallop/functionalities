const scrollTop = "sticky-top";
const moveDown = "sticky-down";
const moveUp = "sticky-up";
class StickyHeader extends HTMLElement {
    constructor() {
        super();
        this.triggerOffset = 0;
        this.prevScrollPos = 0;
        this.scrollPos = 0;
        this.state = scrollTop;
        this.prevState = this.state;
    }
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
    attributeChangedCallback(property, oldValue, newValue) {
        switch (property) {
            case "trigger-offset":
                this.triggerOffset = parseInt(newValue || "0");
                break;
        }
    }
    static get observedAttributes() {
        return ["trigger-offset"];
    }
    registerEvents() {
        window.addEventListener("scroll", this.onScroll.bind(this), {
            passive: true,
        });
        if (!this.hasAttribute("trigger-offset")) {
            window.addEventListener("resize", this.onResize.bind(this), {
                passive: true,
            });
        }
    }
    setState() {
        if (this.hasAttribute("trigger-offset")) {
            this.triggerOffset = parseInt(this.getAttribute("trigger-offset") || "0");
        }
        else {
            this.triggerOffset = this.offsetHeight;
        }
        this.scrollPos =
            document.body.scrollTop || document.documentElement.scrollTop;
        this.prevScrollPos = this.scrollPos;
        if (this.scrollPos > this.triggerOffset) {
            this.state = moveDown;
        }
        else {
            this.state = scrollTop;
        }
        this.prevState = this.state;
    }
    onScroll() {
        this.scrollPos =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (this.scrollPos > this.triggerOffset) {
            if (this.scrollPos > this.prevScrollPos) {
                this.state = moveDown;
                this.prevScrollPos = this.scrollPos;
            }
            else {
                this.state = moveUp;
                this.prevScrollPos = this.scrollPos;
            }
        }
        else {
            this.state = scrollTop;
        }
        if (this.prevState != this.state) {
            this.prevState = this.state;
            this.setClass();
            if (this.hasAttribute("on-change")) {
                const onChange = this.getAttribute("on-change");
                if (onChange) {
                    if (typeof window[onChange] === "function") {
                        window[onChange]({
                            state: this.state,
                            prevState: this.prevState,
                            scrollPos: this.scrollPos,
                        });
                    }
                }
            }
        }
        if (this.hasAttribute("on-scroll")) {
            const onScroll = this.getAttribute("on-scroll");
            if (onScroll) {
                if (typeof window[onScroll] === "function") {
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
    onResize() {
        this.triggerOffset = this.offsetHeight;
    }
}
export default StickyHeader;
//# sourceMappingURL=sticky-header.js.map