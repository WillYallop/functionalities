import Disclosure from "@functionalities/disclosure";
import StickyHeader from "@functionalities/stickyheader";
import Toggler from "@functionalities/toggler";
import Animations from "@functionalities/animations";
import FormHandler from "@functionalities/formhandler";

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
// On change example
const externalValidationExample = new FormHandler("#form-change", {
  validateOnChange: true,
  externalValidation: true,
  onError: (errors) => {
    console.log("errors", errors);
    for (let key in errors) {
      externalValidationExample.setInputError(key);
    }
  },
  submitForm: async (form) => {
    // on success
    const action = form.getAttribute("action");
    const method = form.getAttribute("method");
    if (action && method) {
      const res = await fetch(action, {
        method,
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.errors) {
        return { success: false, errors: data.errors };
      } else {
        return {
          success: true,
          message: "Form submitted successfully",
        };
      }
    }
    return {
      success: false,
      message: "The form must have an action and method attribute",
    };
  },
});
// On submit example
new FormHandler("#form-submit", {
  validateOnChange: false,
  externalValidation: false,
  onError: (errors) => {
    console.log("errors", errors);
  },
  submitForm: async (form) => {
    // on success
    const action = form.getAttribute("action");
    const method = form.getAttribute("method");
    if (action && method) {
      const res = await fetch(action, {
        method,
        body: new FormData(form),
      });
      if (res.ok) {
        console.log("success");
        return {
          success: true,
          message: "Form submission successful",
        };
      } else {
        console.log("error");
        return {
          success: false,
          message: "Form submission failed",
        };
      }
    }
    return {
      success: false,
      message: "The form must have an action and method attribute",
    };
  },
});
