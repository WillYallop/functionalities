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
var _FormHandler_instances, _FormHandler_initialise, _FormHandler_onChange, _FormHandler_onSubmit, _FormHandler_validateInput, _FormHandler_validateForm, _FormHandler_addCustomValidation, _FormHandler_checkInputValidity, _FormHandler_setInputError, _FormHandler_submit;
const defaultErrorClass = "error";
export default class FormHandler {
    constructor(formSelector, config) {
        _FormHandler_instances.add(this);
        this.form = document.querySelector(formSelector);
        this.config = Object.assign({ action: this.form.getAttribute("action") || undefined, errorClass: defaultErrorClass, validate: {
                onChange: true,
                onSubmit: true,
            }, customValidation: [], attributes: {
                inputRelation: "data-input-relation",
                inputError: "data-input-error",
            } }, config);
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_initialise).call(this);
    }
}
_FormHandler_instances = new WeakSet(), _FormHandler_initialise = function _FormHandler_initialise() {
    this.form.setAttribute("novalidate", "true");
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_onSubmit).call(this);
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_onChange).call(this);
}, _FormHandler_onChange = function _FormHandler_onChange() {
    this.form.addEventListener("change", (e) => {
        var _a;
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onChange) {
            __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_validateInput).call(this, e.target);
        }
    });
}, _FormHandler_onSubmit = function _FormHandler_onSubmit() {
    this.form.addEventListener("submit", (e) => {
        var _a;
        e.preventDefault();
        if ((_a = this.config.validate) === null || _a === void 0 ? void 0 : _a.onSubmit) {
            const formValidity = __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_validateForm).call(this, this.form);
            if (!formValidity.valid)
                return;
        }
        __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_submit).call(this);
    });
}, _FormHandler_validateInput = function _FormHandler_validateInput(input) {
    if (!input)
        return undefined;
    if (input.type === "submit")
        return undefined;
    input.setCustomValidity("");
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_addCustomValidation).call(this, input);
    return __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_checkInputValidity).call(this, input);
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
}, _FormHandler_checkInputValidity = function _FormHandler_checkInputValidity(input) {
    const valid = input.checkValidity();
    const name = input.name;
    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setInputError).call(this, valid, name, [input.validationMessage]);
    return {
        name: name,
        valid: valid,
        message: [input.validationMessage],
    };
}, _FormHandler_setInputError = function _FormHandler_setInputError(valid, name, messages) {
    var _a, _b;
    const input = this.form.querySelector('[name="' + name + '"]');
    const relations = this.form.querySelectorAll(`[${(_a = this.config.attributes) === null || _a === void 0 ? void 0 : _a.inputRelation}="${name}"]`);
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
    const inputEle = this.form.querySelector(`[${(_b = this.config.attributes) === null || _b === void 0 ? void 0 : _b.inputError}="${name}"]`);
    if (inputEle) {
        inputEle.innerText = messages[0];
        if (valid) {
            inputEle.classList.add(this.config.errorClass || defaultErrorClass);
        }
        else {
            inputEle.classList.remove(this.config.errorClass || defaultErrorClass);
        }
    }
}, _FormHandler_submit = function _FormHandler_submit() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.config.action)
            return;
        if (this.config.recaptcha) {
            console.log("waiting for recaptcha");
            yield this.config.recaptcha.refresh();
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
                    __classPrivateFieldGet(this, _FormHandler_instances, "m", _FormHandler_setInputError).call(this, false, key, res.errors[key]);
                }
            }
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
//# sourceMappingURL=form-handler.js.map