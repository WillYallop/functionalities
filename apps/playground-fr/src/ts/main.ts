import DisclosureClass from "@functionalities/disclosure";
import StickyHeader from "@functionalities/stickyheader";
import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";
import Forms, { Turnstile } from "@functionalities/forms";
import { Details, Disclosure } from "@functionalities/webcomponents";

customElements.define("functionalities-details", Details);
customElements.define("functionalities-disclosure", Disclosure);

// Disclosures
new DisclosureClass({
  idPrefix: "disclosure_",
  activeClass: "disclosure-active",
  targetAttribute: "data-disclosure",
  duration: 200,
  defaultState: false,
  closeAll: true,
});

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

// Form handler

// On submit example
new Forms("#form", {
  recaptcha: new Turnstile("0x4AAAAAAABGWcyvpwR-o35g"),
  validate: {
    onChange: true,
    onSubmit: true,
  },
  onSuccess: (form, res) => {
    console.log("Success", form, res);
  },
  onError: (form, res) => {
    console.log("Error", form, res);
  },
});

// Toggle disclosure component duration
const toggleBtn = document.querySelector(
  "#toggle-duration"
) as HTMLButtonElement;
const disclosure = document.querySelector("#disclosure_1") as Disclosure;
toggleBtn.addEventListener("click", () => {
  if (disclosure.getAttribute("duration") === "200") {
    disclosure.setAttribute("duration", "500");
    toggleBtn.textContent = "Toggle duration to 500ms";
  } else {
    disclosure.setAttribute("duration", "200");
    toggleBtn.textContent = "Toggle duration to 200ms";
  }
});
