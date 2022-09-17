export default class FormHandler {
    config;
    form;
    constructor(formSelector, config) {
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
        this.form = document.querySelector(formSelector);
        if (!this.form)
            throw new Error("Form not found");
        this.#initialise();
    }
    #initialise() {
        this.form.setAttribute("novalidate", "true");
        this.#setFormStatus("");
        if (this.config.validateOnChange && !this.config.externalValidation)
            this.#onChange();
        this.#onSubmit();
    }
    #onChange() {
        this.form.addEventListener("change", (e) => {
            e.preventDefault();
            this.#setFormStatus("");
            const input = e.target;
            if (!input)
                return;
            input.setCustomValidity("");
            this.#addCustomValidation(input);
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
            const submitButton = this.form.querySelector(`[${this.config.attributes.formSubmit}]`);
            if (submitButton)
                submitButton.disabled = true;
            if (!this.config.externalValidation) {
                const inputs = Array.from(this.form.elements);
                const inputValidityRes = [];
                inputs.forEach((input) => {
                    if (input.type === "submit")
                        return;
                    input.setCustomValidity("");
                    this.#addCustomValidation(input);
                    inputValidityRes.push(this.#checkInputValidity(input));
                });
                if (!this.form.checkValidity()) {
                    if (this.config.onError)
                        this.config.onError(inputValidityRes);
                    if (submitButton)
                        submitButton.disabled = false;
                }
                else {
                    this.#setFormStatus("loading");
                    const res = await this.config.submitForm(this.form);
                    if (res.success) {
                        if (this.config.reset)
                            this.form.reset();
                        this.#setFormStatus("success");
                        this.#setFormMessage(this.config.reset, res.message);
                    }
                    else {
                        this.#setFormStatus("error");
                        this.#setFormMessage(false, res.message);
                    }
                    if (submitButton)
                        submitButton.disabled = false;
                }
            }
            else {
                this.#resetInputErrors();
                this.#setFormStatus("loading");
                const res = await this.config.submitForm(this.form);
                if (res.success) {
                    if (this.config.reset)
                        this.form.reset();
                    this.#setFormStatus("success");
                    this.#setFormMessage(this.config.reset, res.message);
                }
                else {
                    if (res.errors) {
                        if (this.config.onError)
                            this.config.onError(res.errors);
                        this.#setFormStatus("");
                        this.#setFormMessage(false);
                    }
                    else {
                        this.#setFormStatus("error");
                        this.#setFormMessage(false, res.message);
                    }
                }
                if (submitButton)
                    submitButton.disabled = false;
            }
        });
    }
    #addCustomValidation(input) {
        if (this.config.customValidation.length) {
            this.config.customValidation.forEach((validation) => {
                if (input.name === validation.name) {
                    let err = validation.validator(input.value);
                    input.setCustomValidity(err);
                }
            });
        }
    }
    #checkInputValidity(input) {
        const updateRelation = (pass, name) => {
            const relation = this.form.querySelectorAll(`[${this.config.attributes.inputRelation}="${name}"]`);
            [...relation].forEach((ele) => {
                if (pass)
                    ele.classList.remove(this.config.errorClass);
                else
                    ele.classList.add(this.config.errorClass);
            });
            if (pass)
                input.classList.remove(this.config.errorClass);
            else
                input.classList.add(this.config.errorClass);
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
    #setFormStatus(status) {
        const formStatus = this.form.querySelectorAll(`[${this.config.attributes.formStatus}]`);
        formStatus.forEach((ele) => {
            ele.setAttribute(this.config.attributes.formStatus, status);
        });
        this.form.setAttribute(this.config.attributes.formStatus, status);
    }
    #setFormMessage(timeout, message) {
        const formMessage = this.form.querySelectorAll(`[${this.config.attributes.formMessage}]`);
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
    #resetInputErrors() {
        const inputs = Array.from(this.form.elements);
        inputs.forEach((input) => {
            if (input.type === "submit")
                return;
            input.classList.remove(this.config.errorClass);
        });
    }
    setInputError(name) {
        const elements = this.form.querySelectorAll(`[${this.config.attributes.inputRelation}="${name}"], [name="${name}"]`);
        [...elements].forEach((ele) => {
            ele.classList.add(this.config.errorClass);
        });
    }
}
//# sourceMappingURL=index.js.map