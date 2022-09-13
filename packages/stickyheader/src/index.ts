interface configParam {
  triggerDistance?: number;
  classes?: {
    top?: string;
    movedDown?: string;
    movedUp?: string;
  };
  onChange?: (response: { state: string; scrollPos: number }) => void;
}
interface config {
  triggerDistance: number;
  classes: {
    top: string;
    movedDown: string;
    movedUp: string;
  };
  onChange?: configParam["onChange"];
}

export default class StickyHeader {
  config: config;
  headerEle: HTMLElement;
  scrollPos: number;
  prevScrollPos: number;
  state?: string;
  prevState?: string;
  onScroll?: () => void;
  onScrollHandler?: () => void;
  constructor(id: string, config?: configParam) {
    this.config = {
      triggerDistance: config?.triggerDistance || 50,
      classes: {
        top: config?.classes?.top || "sticky-top",
        movedDown: config?.classes?.movedDown || "sticky-down",
        movedUp: config?.classes?.movedUp || "sticky-up",
      },
      onChange: config?.onChange || undefined,
    };

    // set default values
    this.scrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;
    this.prevScrollPos = this.scrollPos;
    this.state = undefined;
    this.prevState = undefined;
    this.headerEle = document.getElementById(id) as HTMLElement;

    // if the headerEle is found
    if (this.headerEle !== undefined) {
      // on scroll function
      this.onScroll = function () {
        this.scrollPos =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (this.scrollPos > this.config.triggerDistance) {
          if (this.scrollPos > this.prevScrollPos) {
            // Sticky down
            this.state = this.config.classes.movedDown;
            this.prevScrollPos = this.scrollPos;
          } else {
            // Sticky up
            this.state = this.config.classes.movedUp;
            this.prevScrollPos = this.scrollPos;
          }
        } else {
          // Sticky top
          this.state = this.config.classes.top;
        }
        // If the state is new - change the header classes
        if (this.prevState != this.state) {
          this.prevState = this.state;
          // Remove
          if (this.state != this.config.classes.movedDown) {
            this.headerEle.classList.remove(this.config.classes.movedDown);
          }
          if (this.state != this.config.classes.movedUp) {
            this.headerEle.classList.remove(this.config.classes.movedUp);
          }
          if (this.state != this.config.classes.top) {
            this.headerEle.classList.remove(this.config.classes.top);
          }
          // Add
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
      // Init
      this.onScrollHandler();
      window.addEventListener("scroll", this.onScrollHandler, true);
    } else console.error(`Header with an ID of ${id} cannot be found!`);
  }
  destroy() {
    if (this.onScrollHandler)
      window.removeEventListener("scroll", this.onScrollHandler, true);
    this.headerEle.classList.remove(this.config.classes.movedDown);
    this.headerEle.classList.remove(this.config.classes.movedUp);
    this.headerEle.classList.remove(this.config.classes.top);
  }
}
