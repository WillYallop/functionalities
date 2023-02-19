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
var _Forms_instances, _Forms_initialise, _Forms_onChange, _Forms_onSubmit, _Forms_validateInput, _Forms_validateForm, _Forms_fileValidation, _Forms_addCustomValidation, _Forms_setInputError, _Forms_formatErrorRes, _Forms_setState, _Forms_setSubmitState, _Forms_bytesToSize, _Forms_submit;
import FlashMessage from "./classes/flash-message";
import Turnstile from "./classes/recaptcha/turnstile";
import GoogleV2 from "./classes/recaptcha/googlev2";
import merge from "./util/merge";
const defaultErrorClass = "error";
export default class Forms {
    constructor(formSelector, config) {
        _Forms_instances.add(this);
        this.config = {};
        this.inputValidationLock = true;
        this.form = document.querySelector(formSelector);
        if (!this.form)
            return;
        this.config = merge({
            recaptcha: undefined,
            flashMessage: undefined,
            disableSubmit: true,
            resetOnSuccess: true,
            action: this.form.getAttribute("action") || undefined,
            errorClass: defaultErrorClass,
            messages: {
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
                inputRelation: "data-i-relation",
                inputError: "data-i-error",
            },
        }, config || {});
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_initialise).call(this);
    }
}
_Forms_instances = new WeakSet(), _Forms_initialise = function _Forms_initialise() {
    this.form.setAttribute("novalidate", "true");
    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_onSubmit).call(this);
    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_onChange).call(this);
    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setSubmitState).call(this, false);
    if (this.config.recaptcha)
        this.config.recaptcha.initialise(this.form);
}, _Forms_onChange = function _Forms_onChange() {
    var _a;
    this.form.addEventListener("change", (e) => {
        var _a;
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onChange) {
            __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_validateForm).call(this, e.target);
        }
    }, { passive: true });
    if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onChange) {
        const inputs = this.form.querySelectorAll("input, textarea, select");
        [...inputs].forEach((input) => {
            input.addEventListener("change", () => {
                if (this.inputValidationLock) {
                    if (input.type === "file") {
                        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_validateInput).call(this, input);
                    }
                    return;
                }
                __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_validateInput).call(this, input);
            });
        }, {
            passive: true,
        });
    }
}, _Forms_onSubmit = function _Forms_onSubmit() {
    this.form.addEventListener("submit", (e) => {
        var _a, _b;
        e.preventDefault();
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setState).call(this, "loading");
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onSubmit) {
            const formValidity = __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_validateForm).call(this, this.form);
            if (!formValidity.valid) {
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(((_b = this.config.messages) === null || _b === void 0 ? void 0 : _b.validationError) || "", false);
                }
                __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setState).call(this, "error");
                this.inputValidationLock = false;
                return;
            }
        }
        this.inputValidationLock = true;
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_submit).call(this);
    }),
        { passive: true };
}, _Forms_validateInput = function _Forms_validateInput(input) {
    if (!input)
        return undefined;
    if (input.type === "submit")
        return undefined;
    input.setCustomValidity("");
    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_addCustomValidation).call(this, input);
    if (input.type === "file")
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_fileValidation).call(this, input);
    const valid = input.checkValidity();
    const name = input.name;
    const messages = [];
    if (!valid)
        messages.push(input.validationMessage);
    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setInputError).call(this, valid, name, messages);
    return {
        name: name,
        valid: valid,
        message: messages,
    };
}, _Forms_validateForm = function _Forms_validateForm(form) {
    const inputs = form.querySelectorAll("input, textarea, select");
    const validity = [];
    [...inputs].forEach((input) => {
        const inputValidity = __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_validateInput).call(this, input);
        if (inputValidity)
            validity.push(inputValidity);
    });
    return {
        inputs: validity,
        valid: form.checkValidity(),
    };
}, _Forms_fileValidation = function _Forms_fileValidation(input) {
    const message = [];
    const checkType = (type, index) => {
        if (!type) {
            if (index !== undefined)
                message.push(`File ${index + 1} is not a valid type.`);
            else
                message.push("Please make sure your file is a valid type.");
            return;
        }
        if (!input.accept.includes(type)) {
            if (index !== undefined)
                message.push(`File ${index + 1} is not a valid type.`);
            else
                message.push("Please make sure your file is a valid type.");
        }
    };
    const checkSize = (size, index) => {
        const acceptMax = input.getAttribute("accept-max");
        const acceptMin = input.getAttribute("accept-min");
        if (acceptMax !== null) {
            const max = (parseInt(acceptMax) || 0) * 1024;
            if (size > max) {
                if (index !== undefined)
                    message.push(`File ${index + 1} is too large.`);
                else
                    message.push(`Please make sure your file is smaller than ${__classPrivateFieldGet(this, _Forms_instances, "m", _Forms_bytesToSize).call(this, max)}.`);
            }
        }
        if (acceptMin !== null) {
            const min = (parseInt(acceptMin) || 0) * 1024;
            if (size < min) {
                if (index !== undefined)
                    message.push(`File ${index + 1} is too small.`);
                else
                    message.push(`Please make sure your file is larger than ${__classPrivateFieldGet(this, _Forms_instances, "m", _Forms_bytesToSize).call(this, min)}.`);
            }
        }
    };
    const files = input.files;
    if (!(files === null || files === void 0 ? void 0 : files.length))
        return;
    if (files.length > 1) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            checkType(file.type, i);
            checkSize(file.size, i);
        }
    }
    else {
        const file = files[0];
        checkType(file.type);
        checkSize(file.size);
    }
    if (message.length) {
        input.setCustomValidity(message.join(" "));
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setInputError).call(this, false, input.name, message);
    }
}, _Forms_addCustomValidation = function _Forms_addCustomValidation(input) {
    var _a;
    if ((_a = this.config.customValidation) === null || _a === void 0 ? void 0 : _a.length) {
        this.config.customValidation.forEach((validation) => {
            if (input.name === validation.name) {
                let err = validation.validator(input.value);
                input.setCustomValidity(err);
            }
        });
    }
}, _Forms_setInputError = function _Forms_setInputError(valid, name, messages) {
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
            ele.innerText = messages.join(" ");
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
}, _Forms_formatErrorRes = function _Forms_formatErrorRes(errors) {
    for (let key in errors) {
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setInputError).call(this, false, key, errors[key]);
    }
}, _Forms_setState = function _Forms_setState(state) {
    this.form.setAttribute("data-form-state", state);
    if (state === "loading") {
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setSubmitState).call(this, true);
    }
    if (state === "success" || state === "error") {
        __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setSubmitState).call(this, false);
    }
    if (state === "success") {
        setTimeout(() => {
            this.form.removeAttribute("data-form-state");
        }, 2000);
    }
}, _Forms_setSubmitState = function _Forms_setSubmitState(state) {
    if (this.config.disableSubmit) {
        const submitEles = this.form.querySelectorAll("input[type=submit]");
        [...submitEles].forEach((ele) => {
            ele.disabled = state;
        });
    }
}, _Forms_bytesToSize = function _Forms_bytesToSize(bytes, decimals = 0) {
    if (!+bytes)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}, _Forms_submit = function _Forms_submit() {
    var _a, _b, _c, _d, _e;
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
        if (this.config.send !== undefined) {
            const res = yield this.config.send(this.config.action, formData);
            if (res.success) {
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(res.message || ((_a = this.config.messages) === null || _a === void 0 ? void 0 : _a.success) || "", true);
                }
                if (this.config.onSuccess)
                    this.config.onSuccess(this.form, res);
                if (this.config.resetOnSuccess)
                    this.form.reset();
                __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setState).call(this, "success");
            }
            else {
                if (res.errors !== undefined)
                    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_formatErrorRes).call(this, res.errors);
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(res.message || ((_b = this.config.messages) === null || _b === void 0 ? void 0 : _b.validationError) || "", false);
                }
                if (this.config.onError)
                    this.config.onError(this.form, res);
                __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setState).call(this, "error");
            }
        }
        else {
            try {
                const res = yield fetch(this.config.action, {
                    method: "POST",
                    body: formData,
                });
                const jsonRes = yield res.json();
                if (jsonRes.errors !== undefined) {
                    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_formatErrorRes).call(this, jsonRes.errors);
                    if (this.config.flashMessage) {
                        this.config.flashMessage.flash(jsonRes.message || ((_c = this.config.messages) === null || _c === void 0 ? void 0 : _c.validationError) || "", false);
                    }
                    if (this.config.onError)
                        this.config.onError(this.form, jsonRes);
                    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setState).call(this, "error");
                }
                else {
                    if (this.config.flashMessage) {
                        this.config.flashMessage.flash(jsonRes.message || ((_d = this.config.messages) === null || _d === void 0 ? void 0 : _d.success) || "", true);
                    }
                    if (this.config.onSuccess)
                        this.config.onSuccess(this.form, jsonRes);
                    if (this.config.resetOnSuccess)
                        this.form.reset();
                    __classPrivateFieldGet(this, _Forms_instances, "m", _Forms_setState).call(this, "success");
                }
            }
            catch (err) {
                if (this.config.flashMessage) {
                    this.config.flashMessage.flash(((_e = this.config.messages) === null || _e === void 0 ? void 0 : _e.error) || "", false);
                }
            }
        }
    });
};
export { FlashMessage, Turnstile, GoogleV2 };
//# sourceMappingURL=index.js.map