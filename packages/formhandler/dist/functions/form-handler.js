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
        }, { passive: true });
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
        }),
            { passive: true };
    }
    #validateInput(input) {
        if (!input)
            return undefined;
        if (input.type === "submit")
            return undefined;
        input.setCustomValidity("");
        this.#addCustomValidation(input);
        const valid = input.checkValidity();
        const name = input.name;
        const messages = [];
        if (!valid)
            messages.push(input.validationMessage);
        this.#setInputError(valid, name, messages);
        return {
            name: name,
            valid: valid,
            message: messages,
        };
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
    #setInputError(valid, name, messages) {
        const input = this.form.querySelector('[name="' + name + '"]');
        if (!input)
            return;
        console.log(input, valid);
        const relations = this.form.querySelectorAll(`[${this.config.attributes?.inputRelation}="${name}"]`);
        [...relations].forEach((ele) => {
            if (valid)
                ele.classList.remove(this.config.errorClass || defaultErrorClass);
            else
                ele.classList.add(this.config.errorClass || defaultErrorClass);
        });
        const errorEles = this.form.querySelectorAll(`[${this.config.attributes?.inputError}="${name}"]`);
        [...errorEles].forEach((ele) => {
            if (valid) {
                ele.classList.remove(this.config.errorClass || defaultErrorClass);
            }
            else {
                ele.classList.add(this.config.errorClass || defaultErrorClass);
                ele.innerText = messages[0];
            }
        });
        if (valid)
            input.classList.remove(this.config.errorClass || defaultErrorClass);
        else
            input.classList.add(this.config.errorClass || defaultErrorClass);
    }
    #formatErrorRes(errors) {
        for (let key in errors) {
            this.#setInputError(false, key, errors[key]);
        }
    }
    async #submit() {
        if (!this.config.action)
            return;
        const formData = new FormData(this.form);
        const fileInputs = this.form.querySelectorAll("input[type='file']");
        [...fileInputs].forEach((input) => {
            if (!input.required && !input.value)
                formData.delete(input.name);
        });
        const res = await fetch(this.config.action, {
            method: "POST",
            body: formData,
        });
        const jsonRes = await res.json();
        if (jsonRes.errors) {
            this.#formatErrorRes(jsonRes.errors);
        }
    }
}
//# sourceMappingURL=form-handler.js.map