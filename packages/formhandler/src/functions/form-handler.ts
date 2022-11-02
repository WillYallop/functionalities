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
  validate?: {
    onChange?: boolean;
    onBlur?: boolean;
    onSubmit?: boolean;
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
  constructor(formSelector: string, config: Config) {
    this.form = document.querySelector(formSelector) as HTMLFormElement;
    this.config = {
      action: this.form.getAttribute("action") || undefined,
      errorClass: defaultErrorClass,
      validate: {
        onChange: true,
        onSubmit: true,
      },
      customValidation: [],
      attributes: {
        inputRelation: "data-input-relation",
        inputError: "data-input-error",
      },
      ...config,
    };
    this.#initialise();
  }
  #initialise() {
    this.form.setAttribute("novalidate", "true");
    this.#onSubmit();
    this.#onChange();
  }
  // ----------------------------------------
  // register events
  #onChange() {
    this.form.addEventListener("change", (e) => {
      if (this.config.validate?.onChange) {
        this.#validateInput(e.target as InputElement);
      }
    });
  }
  #onSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // If validate on submit is set to true
      if (this.config.validate?.onSubmit) {
        const formValidity = this.#validateForm(this.form);
        if (!formValidity.valid) return;
      }

      this.#submit();
    });
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
    return this.#checkInputValidity(input);
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
  #checkInputValidity(input: InputElement): InputValidity {
    const valid = input.checkValidity();
    const name = input.name;

    this.#setInputError(valid, name, [input.validationMessage]);

    // return the status
    return {
      name: name,
      valid: valid,
      message: [input.validationMessage],
    };
  }
  #setInputError(valid: boolean, name: string, messages: Array<string>) {
    // find corresponding input element
    const input = this.form.querySelector(
      '[name="' + name + '"]'
    ) as HTMLElement;

    // get the input wrapper
    const relations = this.form.querySelectorAll(
      `[${this.config.attributes?.inputRelation}="${name}"]`
    ) as NodeListOf<HTMLInputElement>;

    // for each wrapper, if we are valid, remove error class, else add error class
    // should only be one wrapper, but just in case
    [...relations].forEach((ele) => {
      if (valid)
        ele.classList.remove(this.config.errorClass || defaultErrorClass);
      else ele.classList.add(this.config.errorClass || defaultErrorClass);
    });

    // for the input itself, if we are valid, remove error class, else add error class
    if (valid)
      input.classList.remove(this.config.errorClass || defaultErrorClass);
    else input.classList.add(this.config.errorClass || defaultErrorClass);

    // find corresponding error element
    const inputEle = this.form.querySelector(
      `[${this.config.attributes?.inputError}="${name}"]`
    ) as HTMLElement;
    if (inputEle) {
      inputEle.innerText = messages[0];
      if (valid) {
        inputEle.classList.add(this.config.errorClass || defaultErrorClass);
      } else {
        inputEle.classList.remove(this.config.errorClass || defaultErrorClass);
      }
    }
  }
  // ----------------------------------------
  // utility functions

  // ----------------------------------------
  // submit
  #submit() {
    if (!this.config.action) return;

    // set the form data
    const formData = new FormData(this.form);

    fetch(this.config.action, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          for (let key in res.errors) {
            this.#setInputError(false, key, res.errors[key]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
