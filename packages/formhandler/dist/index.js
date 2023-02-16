var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormHandler_instances, _FormHandler_initialise, _FormHandler_onChange, _FormHandler_onSubmit, _FormHandler_validateInput, _FormHandler_validateForm, _FormHandler_addCustomValidation, _FormHandler_setInputError, _FormHandler_formatErrorRes, _FormHandler_setState, _FormHandler_setSubmitState, _FormHandler_submit;
import FlashMessage from "./classes/flash-message";
import Turnstile from "./classes/recaptcha/turnstile";
import GoogleV2 from "./classes/recaptcha/googlev2";
import merge from "./util/merge";
const defaultErrorClass = "error";
export default class FormHandler {
    constructor(formSelector, config) {
        _FormHandler_instances.add(this);
        this.inputeValidationLock = true;
        this.form = document.querySelector(formSelector);
        this.config = merge({
            recaptcha: undefined,
            flashMessage: undefined,
            disableSubmit: true,
            resetOnSuccess: true,
            action: this.form.getAttribute("action") || undefined,
            errorClass: defaultErrorClass,
            localisation: {
                validationError: "There was a problem validating your form data, please try again.",
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
        }, config || {});
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_initialise).call(this);
    }
}
_FormHandler_instances = new WeakSet(), _FormHandler_initialise = function _FormHandler_initialise() {
    this.form.setAttribute("novalidate", "true");
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_onSubmit).call(this);
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_onChange).call(this);
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setSubmitState).call(this, false);
    if (this.config.recaptcha)
        this.config.recaptcha.initialise(this.form);
}, _FormHandler_onChange = function _FormHandler_onChange() {
    this.form.addEventListener("change", (e) => {
        var _a;
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onChange) {
            __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_validateForm).call(this, e.target);
        }
    }, { passive: true });
    const inputs = this.form.querySelectorAll("input, textarea, select");
    [...inputs].forEach((input) => {
        var _a;
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onChange) {
            input.addEventListener("change", (e) => {
                if (this.inputeValidationLock)
                    return;
                __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_validateInput).call(this, e.target);
            }, { passive: true });
        }
    });
}, _FormHandler_onSubmit = function _FormHandler_onSubmit() {
    this.form.addEventListener("submit", (e) => {
        var _a, _b;
        e.preventDefault();
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setState).call(this, "loading");
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onSubmit) {
            const formValidity = __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_validateForm).call(this, this.form);
            if (!formValidity.valid) {
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(((_b = this.config.localisation) === null || _b === void 0 ? void 0 : _b.validationError) || "", false);
                }
                __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setState).call(this, "error");
                this.inputeValidationLock = false;
                return;
            }
        }
        this.inputeValidationLock = true;
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_submit).call(this);
    }),
        { passive: true };
}, _FormHandler_validateInput = function _FormHandler_validateInput(input) {
    if (!input)
        return undefined;
    if (input.type === "submit")
        return undefined;
    input.setCustomValidity("");
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_addCustomValidation).call(this, input);
    const valid = input.checkValidity();
    const name = input.name;
    const messages = [];
    if (!valid)
        messages.push(input.validationMessage);
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setInputError).call(this, valid, name, messages);
    return {
        name: name,
        valid: valid,
        message: messages,
    };
}, _FormHandler_validateForm = function _FormHandler_validateForm(form) {
    const inputs = form.querySelectorAll("input, textarea, select");
    const validity = [];
    [...inputs].forEach((input) => {
        const inputValidity = __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_validateInput).call(this, input);
        if (inputValidity)
            validity.push(inputValidity);
    });
    return {
        inputs: validity,
        valid: form.checkValidity(),
    };
}, _FormHandler_addCustomValidation = function _FormHandler_addCustomValidation(input) {
    var _a;
    if ((_a = this.config.customValidation) === null || _a === void 0 ? void 0 : _a.length) {
        this.config.customValidation.forEach((validation) => {
            if (input.name === validation.name) {
                let err = validation.validator(input.value);
                input.setCustomValidity(err);
            }
        });
    }
}, _FormHandler_setInputError = function _FormHandler_setInputError(valid, name, messages) {
    var _a, _b;
    const input = this.form.querySelector('[name="' + name + '"]');
    if (!input)
        return;
    const relations = this.form.querySelectorAll(`[${(_a = this.config.attributes) === null || _a === void 0 ? void 0 : _a.inputRelation}="${name}"]`);
    [...relations].forEach((ele) => {
        if (valid)
            ele.classList.remove(this.config.errorClass || defaultErrorClass);
        else
            ele.classList.add(this.config.errorClass || defaultErrorClass);
    });
    const errorEles = this.form.querySelectorAll(`[${(_b = this.config.attributes) === null || _b === void 0 ? void 0 : _b.inputError}="${name}"]`);
    [...errorEles].forEach((ele) => {
        if (valid) {
            ele.classList.remove(this.config.errorClass || defaultErrorClass);
        }
        else {
            ele.classList.add(this.config.errorClass || defaultErrorClass);
            ele.innerText = messages[0];
        }
    });
    if (valid) {
        input.classList.remove(this.config.errorClass || defaultErrorClass);
        input.setAttribute("aria-invalid", "false");
    }
    else {
        input.classList.add(this.config.errorClass || defaultErrorClass);
        input.setAttribute("aria-invalid", "true");
    }
}, _FormHandler_formatErrorRes = function _FormHandler_formatErrorRes(errors) {
    for (let key in errors) {
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setInputError).call(this, false, key, errors[key]);
    }
}, _FormHandler_setState = function _FormHandler_setState(state) {
    this.form.setAttribute("data-form-state", state);
    if (state === "loading") {
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setSubmitState).call(this, true);
    }
    if (state === "success" || state === "error") {
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setSubmitState).call(this, false);
    }
    if (state === "success") {
        setTimeout(() => {
            this.form.removeAttribute("data-form-state");
        }, 2000);
    }
}, _FormHandler_setSubmitState = function _FormHandler_setSubmitState(state) {
    if (this.config.disableSubmit) {
        const submitEles = this.form.querySelectorAll("input[type=submit]");
        [...submitEles].forEach((ele) => {
            ele.disabled = state;
        });
    }
}, _FormHandler_submit = function _FormHandler_submit() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.config.action)
            return;
        if (this.config.recaptcha) {
            yield this.config.recaptcha.refresh();
        }
        const formData = new FormData(this.form);
        const fileInputs = this.form.querySelectorAll("input[type='file']");
        [...fileInputs].forEach((input) => {
            if (!input.required && !input.value)
                formData.delete(input.name);
        });
        try {
            const res = yield fetch(this.config.action, {
                method: "POST",
                body: formData,
            });
            const jsonRes = yield res.json();
            if (jsonRes.errors !== undefined) {
                __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_formatErrorRes).call(this, jsonRes.errors);
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(jsonRes.message || ((_a = this.config.localisation) === null || _a === void 0 ? void 0 : _a.validationError) || "", false);
                }
                if (this.config.onError)
                    this.config.onError(this.form, jsonRes);
                __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setState).call(this, "error");
            }
            else {
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(jsonRes.message || ((_b = this.config.localisation) === null || _b === void 0 ? void 0 : _b.success) || "", true);
                }
                if (this.config.onSuccess)
                    this.config.onSuccess(this.form, jsonRes);
                if (this.config.resetOnSuccess)
                    this.form.reset();
                __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setState).call(this, "success");
            }
        }
        catch (err) {
            if (this.config.flashMessage) {
                this.config.flashMessage.flash(((_c = this.config.localisation) === null || _c === void 0 ? void 0 : _c.error) || "", false);
            }
        }
    });
};
export { FlashMessage, Turnstile, GoogleV2 };
//# sourceMappingURL=index.js.map