const defaultErrorClass = "error";
export default class FormHandler {
    config;
    form;
    constructor(formSelector, config) {
        this.form = document.querySelector(formSelector);
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
    #onChange() {
        this.form.addEventListener("change", (e) => {
            if (this.config.validate?.onChange) {
                this.#validateInput(e.target);
            }
        });
    }
    #onSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.config.validate?.onSubmit) {
                const formValidity = this.#validateForm(this.form);
                if (!formValidity.valid)
                    return;
            }
            this.#submit();
        });
    }
    #validateInput(input) {
        if (!input)
            return undefined;
        if (input.type === "submit")
            return undefined;
        input.setCustomValidity("");
        this.#addCustomValidation(input);
        return this.#checkInputValidity(input);
    }
    #validateForm(form) {
        const inputs = form.querySelectorAll("input, textarea, select");
        const validity = [];
        [...inputs].forEach((input) => {
            const inputValidity = this.#validateInput(input);
            if (inputValidity)
                validity.push(inputValidity);
        });
        return {
            inputs: validity,
            valid: form.checkValidity(),
        };
    }
    #addCustomValidation(input) {
        if (this.config.customValidation?.length) {
            this.config.customValidation.forEach((validation) => {
                if (input.name === validation.name) {
                    let err = validation.validator(input.value);
                    input.setCustomValidity(err);
                }
            });
        }
    }
    #checkInputValidity(input) {
        const valid = input.checkValidity();
        const name = input.name;
        this.#setInputError(valid, name, [input.validationMessage]);
        return {
            name: name,
            valid: valid,
            message: [input.validationMessage],
        };
    }
    #setInputError(valid, name, messages) {
        const input = this.form.querySelector('[name="' + name + '"]');
        const relations = this.form.querySelectorAll(`[${this.config.attributes?.inputRelation}="${name}"]`);
        [...relations].forEach((ele) => {
            if (valid)
                ele.classList.remove(this.config.errorClass || defaultErrorClass);
            else
                ele.classList.add(this.config.errorClass || defaultErrorClass);
        });
        if (valid)
            input.classList.remove(this.config.errorClass || defaultErrorClass);
        else
            input.classList.add(this.config.errorClass || defaultErrorClass);
        const inputEle = this.form.querySelector(`[${this.config.attributes?.inputError}="${name}"]`);
        if (inputEle) {
            inputEle.innerText = messages[0];
            if (valid) {
                inputEle.classList.add(this.config.errorClass || defaultErrorClass);
            }
            else {
                inputEle.classList.remove(this.config.errorClass || defaultErrorClass);
            }
        }
    }
    async #submit() {
        if (!this.config.action)
            return;
        if (this.config.recaptcha) {
            console.log("waiting for recaptcha");
            await this.config.recaptcha.refresh();
            console.log("recaptcha done");
        }
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
//# sourceMappingURL=form-handler.js.map