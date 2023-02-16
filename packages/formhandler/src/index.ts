import FlashMessage from "./classes/flash-message";
import Turnstile from "./classes/recaptcha/turnstile";
import GoogleV2 from "./classes/recaptcha/googlev2";
// Util
import merge from "./util/merge";

// Types
interface CustomValidation {
  name: string;
  validator: (value: string) => string;
}
interface InputValidity {
  name: string;
  valid: boolean;
  message: Array<string>;
}
interface Config {
  recaptcha?: Turnstile | GoogleV2;
  resetOnSuccess?: boolean;
  flashMessage?: FlashMessage;
  disableSubmit?: boolean;
  validate?: {
    onChange?: boolean;
    onSubmit?: boolean;
  };
  localisation?: {
    validationError?: string;
    error?: string;
    success?: string;
  };
  errorClass?: string;
  action?: string;
  customValidation?: Array<CustomValidation>;
  attributes?: {
    inputRelation?: string;
    inputError?: string;
  };
  onSuccess?: (form: HTMLFormElement, res: any) => void;
  onError?: (form: HTMLFormElement, res: any) => void;
}
type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Constants
const defaultErrorClass = "error";

export default class FormHandler {
  config: Config;
  form: HTMLFormElement;
  inputeValidationLock: boolean = true;
  constructor(formSelector: string, config?: Config) {
    this.form = document.querySelector(formSelector) as HTMLFormElement;
    this.config = merge(
      {
        recaptcha: undefined,
        flashMessage: undefined,
        disableSubmit: true,
        resetOnSuccess: true,
        action: this.form.getAttribute("action") || undefined,
        errorClass: defaultErrorClass,
        localisation: {
          validationError:
            "There was a problem validating your form data, please try again.",
          error: "There was an error with your submission.",
          success: "Thank you for your submission.",
        },
        validate: {
          onChange: true,
          onSubmit: true,
        },
        customValidation: [],
        attributes: {
          inputRelation: "data-input-relation",
          inputError: "data-input-error",
        },
      },
      config || {}
    );
    this.#initialise();
  }
  #initialise() {
    this.form.setAttribute("novalidate", "true");
    this.#onSubmit();
    this.#onChange();
    this.#setSubmitState(false);
    if (this.config.recaptcha) this.config.recaptcha.initialise(this.form);
  }
  // ----------------------------------------
  // register events
  #onChange() {
    this.form.addEventListener(
      "change",
      (e) => {
        if (this.config.validate?.onChange) {
          this.#validateForm(e.target as HTMLFormElement);
        }
      },
      { passive: true }
    );
    const inputs = this.form.querySelectorAll("input, textarea, select");
    [...inputs].forEach((input) => {
      if (this.config.validate?.onChange) {
        input.addEventListener(
          "change",
          (e) => {
            if (this.inputeValidationLock) return;
            this.#validateInput(e.target as InputElement);
          },
          { passive: true }
        );
      }
    });
  }
  #onSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#setState("loading");
      // If validate on submit is set to true
      if (this.config.validate?.onSubmit) {
        const formValidity = this.#validateForm(this.form);
        if (!formValidity.valid) {
          if (this.config.flashMessage) {
            this.config.flashMessage.flash(
              this.config.localisation?.validationError || "",
              false
            );
          }
          this.#setState("error");
          this.inputeValidationLock = false;
          return;
        }
      }
      this.inputeValidationLock = true;
      this.#submit();
    }),
      { passive: true };
  }
  // ----------------------------------------
  // validation
  #validateInput(input?: InputElement): InputValidity | undefined {
    if (!input) return undefined;
    if (input.type === "submit") return undefined;
    // reset inputs custom error validity
    input.setCustomValidity("");
    // runs inputs custom validation and sets custom validity
    this.#addCustomValidation(input);
    // check input validity
    const valid = input.checkValidity();
    const name = input.name;
    const messages = [];
    if (!valid) messages.push(input.validationMessage);
    // set error class and message
    this.#setInputError(valid, name, messages);
    // return validity
    return {
      name: name,
      valid: valid,
      message: messages,
    };
  }
  #validateForm(form: HTMLFormElement) {
    const inputs = form.querySelectorAll("input, textarea, select");
    const validity: Array<InputValidity> = [];
    [...inputs].forEach((input) => {
      const inputValidity = this.#validateInput(input as HTMLInputElement);
      if (inputValidity) validity.push(inputValidity);
    });
    return {
      inputs: validity,
      valid: form.checkValidity(),
    };
  }
  // ----------------------------------------
  // validation utility functions
  #addCustomValidation(input: InputElement) {
    // adds custom validation to the inputs
    if (this.config.customValidation?.length) {
      this.config.customValidation.forEach((validation) => {
        if (input.name === validation.name) {
          let err = validation.validator(input.value);
          input.setCustomValidity(err);
        }
      });
    }
  }
  #setInputError(valid: boolean, name: string, messages: Array<string>) {
    // find corresponding input element
    const input = this.form.querySelector(
      '[name="' + name + '"]'
    ) as InputElement;
    if (!input) return;

    // get the input wrapper
    const relations = this.form.querySelectorAll(
      `[${this.config.attributes?.inputRelation}="${name}"]`
    ) as NodeListOf<HTMLInputElement>;

    // for each relation set error class
    // should only be one wrapper, but just in case
    [...relations].forEach((ele) => {
      if (valid)
        ele.classList.remove(this.config.errorClass || defaultErrorClass);
      else ele.classList.add(this.config.errorClass || defaultErrorClass);
    });

    // for error element set error class and message
    const errorEles = this.form.querySelectorAll(
      `[${this.config.attributes?.inputError}="${name}"]`
    ) as NodeListOf<HTMLElement>;
    // should only be one wrapper, but just in case
    [...errorEles].forEach((ele) => {
      if (valid) {
        ele.classList.remove(this.config.errorClass || defaultErrorClass);
      } else {
        ele.classList.add(this.config.errorClass || defaultErrorClass);
        ele.innerText = messages[0];
      }
    });

    // for input set error class
    if (valid) {
      input.classList.remove(this.config.errorClass || defaultErrorClass);
      input.setAttribute("aria-invalid", "false");
    } else {
      input.classList.add(this.config.errorClass || defaultErrorClass);
      input.setAttribute("aria-invalid", "true");
    }
  }
  // ----------------------------------------
  // utility functions
  #formatErrorRes(errors: { [key: string]: Array<string> }) {
    for (let key in errors) {
      this.#setInputError(false, key, errors[key]);
    }
  }
  #setState(state: "loading" | "success" | "error") {
    this.form.setAttribute("data-form-state", state);

    if (state === "loading") {
      this.#setSubmitState(true);
    }
    if (state === "success" || state === "error") {
      this.#setSubmitState(false);
    }
    if (state === "success") {
      setTimeout(() => {
        this.form.removeAttribute("data-form-state");
      }, 2000);
    }
  }
  #setSubmitState(state: boolean) {
    if (this.config.disableSubmit) {
      const submitEles = this.form.querySelectorAll(
        "input[type=submit]"
      ) as NodeListOf<HTMLInputElement>;
      [...submitEles].forEach((ele) => {
        ele.disabled = state;
      });
    }
  }
  // ----------------------------------------
  // submit
  async #submit() {
    if (!this.config.action) return;

    // if recaptcha is enabled, refresh the token and add it to the form data
    if (this.config.recaptcha) {
      await this.config.recaptcha.refresh();
    }

    // set the form data
    const formData = new FormData(this.form);

    // remove file inputs if the value is empty and they are not required
    const fileInputs = this.form.querySelectorAll(
      "input[type='file']"
    ) as NodeListOf<HTMLInputElement>;
    [...fileInputs].forEach((input) => {
      if (!input.required && !input.value) formData.delete(input.name);
    });

    // send
    try {
      const res = await fetch(this.config.action, {
        method: "POST",
        body: formData,
      });
      const jsonRes = await res.json();

      if (jsonRes.errors !== undefined) {
        this.#formatErrorRes(jsonRes.errors);
        if (this.config.flashMessage) {
          this.config.flashMessage.flash(
            jsonRes.message || this.config.localisation?.validationError || "",
            false
          );
        }
        if (this.config.onError) this.config.onError(this.form, jsonRes);
        this.#setState("error");
      } else {
        if (this.config.flashMessage) {
          this.config.flashMessage.flash(
            jsonRes.message || this.config.localisation?.success || "",
            true
          );
        }
        if (this.config.onSuccess) this.config.onSuccess(this.form, jsonRes);
        if (this.config.resetOnSuccess) this.form.reset();
        this.#setState("success");
      }
    } catch (err) {
      if (this.config.flashMessage) {
        this.config.flashMessage.flash(
          this.config.localisation?.error || "",
          false
        );
      }
    }
  }
}

export { FlashMessage, Turnstile, GoogleV2 };
