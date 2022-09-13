import Disclosure from "@functionalities/disclosure";

new Disclosure({
  idPrefix: "disclosure_",
  activeClass: "disclosure-active",
  targetAttribute: "data-disclosure",
  duration: 200,
  defaultState: false,
  closeAll: true,
});
