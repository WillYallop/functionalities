import Disclosure from "@functionalities/disclosure";
import StickyHeader from "@functionalities/stickyheader";
import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";

new Disclosure({
  idPrefix: "disclosure_",
  activeClass: "disclosure-active",
  targetAttribute: "data-disclosure",
  duration: 200,
  defaultState: false,
  closeAll: true,
});

new StickyHeader("siteHeader", {
  triggerDistance: 50,
  classes: {
    top: "sticky-top",
    movedDown: "sticky-down",
    movedUp: "sticky-up",
  },
  onChange: () => {},
});

new Toggler();

new Animations({
  activeClass: "animate",
  reset: true,
});
