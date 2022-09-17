// Types
interface CustomValidation {
  name: string;
  validator: (value: string) => string;
}
interface Config {
  validateOnChange?: boolean;
  externalValidation?: boolean;
  customValidation?: Array<CustomValidation>;
  errorClass?: string;
  reset?: boolean;
  showMessageDuration?: number;
  submitForm: (form: HTMLFormElement) => Promise<{
    success: boolean;
    message?: string;
    errors?: any;
  }>;
  onError?: (errors: any) => void;
}
interface DefaultConfig {
  validateOnChange: boolean;
  externalValidation: boolean;
  customValidation: Array<CustomValidation>;
  errorClass: string;
  reset: boolean;
  showMessageDuration: number;
  submitForm: (form: HTMLFormElement) => Promise<{
    success: boolean;
    message?: string;
    errors?: any;
  }>;
  onError?: (errors: any) => void;
  attributes: {
    inputRelation: string;
    formSubmit: string;
    formStatus: string;
    formMessage: string;
  };
}
interface InputValidity {
  name: string;
  valid: boolean;
  message: string;
}

export default class FormHandler {
  config: DefaultConfig;
  form: HTMLFormElement;
  constructor(formSelector: string, config: Config) {
    this.config = {
      validateOnChange: false,
      externalValidation: false,
      errorClass: "error",
      customValidation: [],
      onError: undefined,
      reset: true,
      showMessageDuration: 3000,
      attributes: {
        inputRelation: "data-input-relation",
        formSubmit: "data-form-submit",
        formStatus: "data-form-status",
        formMessage: "data-form-message",
      },
      ...config,
    };
    this.form = document.querySelector(formSelector) as HTMLFormElement;
    if (!this.form) throw new Error("Form not found");
    this.#initialise();
  }
  #initialise() {
    this.form.setAttribute("novalidate", "true");
    this.#setFormStatus("");
    if (this.config.validateOnChange && !this.config.externalValidation)
      this.#onChange();
    this.#onSubmit();
  }
  // ----------------------------------------
  // register events
  #onChange() {
    this.form.addEventListener("change", (e) => {
      e.preventDefault();
      this.#setFormStatus("");
      const input = e.target as HTMLInputElement;
      if (!input) return;
      // reset inputs custom error validity
      input.setCustomValidity("");
      // runs inputs custom validation and sets custom validity
      this.#addCustomValidation(input);
      // check input validity
      const InputValidity = this.#checkInputValidity(input);

      if (!this.form.checkValidity() && this.config.onError)
        this.config.onError([InputValidity]);
    });
  }
  #onSubmit() {
    this.form.addEventListener("submit", async (e) => {
      this.#setFormStatus("");
      this.#setFormMessage(false);
      e.preventDefault();
      // get submit input/button
      const submitButton = this.form.querySelector(
        `[${this.config.attributes.formSubmit}]`
      ) as HTMLButtonElement;
      if (submitButton) submitButton.disabled = true;
      // use our browser validation
      if (!this.config.externalValidation) {
        // get all inputs
        const inputs = Array.from(
          this.form.elements
        ) as Array<HTMLInputElement>;
        // reset inputs custom error validity, then runs custom validation if req
        const inputValidityRes: Array<InputValidity> = [];
        inputs.forEach((input) => {
          if (input.type === "submit") return;
          input.setCustomValidity("");
          this.#addCustomValidation(input);
          inputValidityRes.push(this.#checkInputValidity(input));
        });
        if (!this.form.checkValidity()) {
          if (this.config.onError) this.config.onError(inputValidityRes);
          if (submitButton) submitButton.disabled = false;
        } else {
          this.#setFormStatus("loading");
          const res = await this.config.submitForm(this.form);
          if (res.success) {
            if (this.config.reset) this.form.reset();
            this.#setFormStatus("success");
            this.#setFormMessage(this.config.reset, res.message);
          } else {
            this.#setFormStatus("error");
            this.#setFormMessage(false, res.message);
          }
          if (submitButton) submitButton.disabled = false;
        }
      }
      // use external validation
      else {
        this.#resetInputErrors();
        this.#setFormStatus("loading");
        const res = await this.config.submitForm(this.form);
        if (res.success) {
          if (this.config.reset) this.form.reset();
          this.#setFormStatus("success");
          this.#setFormMessage(this.config.reset, res.message);
        } else {
          if (res.errors) {
            if (this.config.onError) this.config.onError(res.errors);
            this.#setFormStatus("");
            this.#setFormMessage(false);
          } else {
            this.#setFormStatus("error");
            this.#setFormMessage(false, res.message);
          }
        }
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
  // ----------------------------------------
  // utility functions
  #addCustomValidation(input: HTMLInputElement) {
    if (this.config.customValidation.length) {
      this.config.customValidation.forEach((validation) => {
        if (input.name === validation.name) {
          let err = validation.validator(input.value);
          input.setCustomValidity(err);
        }
      });
    }
  }
  #checkInputValidity(input: HTMLInputElement): InputValidity {
    const updateRelation = (pass: boolean, name: string) => {
      const relation = this.form.querySelectorAll(
        `[${this.config.attributes.inputRelation}="${name}"]`
      ) as NodeListOf<HTMLInputElement>;
      [...relation].forEach((ele) => {
        if (pass) ele.classList.remove(this.config.errorClass);
        else ele.classList.add(this.config.errorClass);
      });
      if (pass) input.classList.remove(this.config.errorClass);
      else input.classList.add(this.config.errorClass);
    };
    const valid = input.checkValidity();
    const name = input.name;
    updateRelation(valid, name);

    return {
      name: name,
      valid: valid,
      message: input.validationMessage,
    };
  }
  #setFormStatus(status: string) {
    const formStatus = this.form.querySelectorAll(
      `[${this.config.attributes.formStatus}]`
    ) as NodeListOf<HTMLElement>;
    formStatus.forEach((ele) => {
      ele.setAttribute(this.config.attributes.formStatus, status);
    });
    this.form.setAttribute(this.config.attributes.formStatus, status);
  }
  #setFormMessage(timeout: boolean, message?: string) {
    const formMessage = this.form.querySelectorAll(
      `[${this.config.attributes.formMessage}]`
    ) as NodeListOf<HTMLElement>;
    formMessage.forEach((ele) => {
      ele.innerHTML = message || "";
    });
    if (timeout) {
      setTimeout(() => {
        this.#setFormMessage(false);
        this.#setFormStatus("");
      }, this.config.showMessageDuration);
    }
  }
  // for external validation type
  #resetInputErrors() {
    const inputs = Array.from(this.form.elements) as Array<HTMLInputElement>;
    inputs.forEach((input) => {
      if (input.type === "submit") return;
      input.classList.remove(this.config.errorClass);
    });
  }
  setInputError(name: string) {
    const elements = this.form.querySelectorAll(
      `[${this.config.attributes.inputRelation}="${name}"], [name="${name}"]`
    ) as NodeListOf<HTMLInputElement>;
    [...elements].forEach((ele) => {
      ele.classList.add(this.config.errorClass);
    });
  }
}
