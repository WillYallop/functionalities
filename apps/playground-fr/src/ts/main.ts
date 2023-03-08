import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";
import {
  Details,
  Disclosure,
  StickyHeader,
} from "@functionalities/webcomponents";

customElements.define("functionalities-details", Details);
customElements.define("functionalities-disclosure", Disclosure);
customElements.define("functionalities-sticky-header", StickyHeader);

// @ts-ignore
window.windowOnScroll = (data) => {
  //   console.log(data);
};

// @ts-ignore
window.windowOnChange = (data) => {
  //   console.log(data);
};

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
