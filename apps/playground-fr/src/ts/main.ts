import StickyHeader from "@functionalities/stickyheader";
import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";
import { Details, Disclosure } from "@functionalities/webcomponents";

customElements.define("functionalities-details", Details);
customElements.define("functionalities-disclosure", Disclosure);

// Sticky header
new StickyHeader("siteHeader", {
  triggerDistance: 50,
  classes: {
    top: "sticky-top",
    movedDown: "sticky-down",
    movedUp: "sticky-up",
  },
  onChange: () => {},
  onScroll: () => {},
});

// Toggler
new Toggler({
  activeClass: "active",
  functions: {
    updateDonkeys: (instance, ele) => {
      console.log("updateDonkeys", instance, ele);
    },
  },
});

// Animations
new Animations({
  activeClass: "animate",
  reset: true,
  threshold: 1,
});
