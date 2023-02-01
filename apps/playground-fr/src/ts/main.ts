import Disclosure from "@functionalities/disclosure";
import StickyHeader from "@functionalities/stickyheader";
import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";
import FormHandler, {
  flashMessage,
  conditionalInputs,
  Turnstile,
} from "@functionalities/formhandler";

// Disclosures
new Disclosure({
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
});

// Animations
new Animations({
  activeClass: "animate",
  reset: true,
  threshold: 1,
});

// Form handler

// On submit example
new FormHandler("#form", {
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
