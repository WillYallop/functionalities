var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FlashMessage_instances, _FlashMessage_initialise, _FlashMessage_toggle;
export default class FlashMessage {
    constructor(selector, duration = 5000) {
        _FlashMessage_instances.add(this);
        this.element = document.querySelector(selector);
        this.attributes = {
            close: "data-fm-close",
            message: "data-fm-message",
        };
        this.duration = duration;
        this.state = false;
        __classPrivateFieldGet(this, _FlashMessage_instances, "m", _FlashMessage_initialise).call(this);
    }
    flash(message, success) {
        __classPrivateFieldGet(this, _FlashMessage_instances, "m", _FlashMessage_toggle).call(this, true);
        const messageElement = this.element.querySelector(`[${this.attributes.message}]`);
        if (messageElement) {
            messageElement.innerText = message;
        }
        if (success) {
            this.element.classList.add("is-success");
            this.element.classList.remove("is-error");
        }
        else {
            this.element.classList.add("is-error");
            this.element.classList.remove("is-success");
        }
    }
}
_FlashMessage_instances = new WeakSet(), _FlashMessage_initialise = function _FlashMessage_initialise() {
    if (this.element) {
        const closeElements = this.element.querySelectorAll(`[${this.attributes.close}]`);
        [...closeElements].forEach((ele) => {
            ele.addEventListener("click", (e) => {
                var _a;
                e.preventDefault();
                e.stopPropagation();
                (_a = e.target) === null || _a === void 0 ? void 0 : _a.blur();
                __classPrivateFieldGet(this, _FlashMessage_instances, "m", _FlashMessage_toggle).call(this, false);
            });
        });
    }
}, _FlashMessage_toggle = function _FlashMessage_toggle(state) {
    if (this.element) {
        this.state = state;
        if (state) {
            this.element.classList.add("is-active");
            setTimeout(() => {
                __classPrivateFieldGet(this, _FlashMessage_instances, "m", _FlashMessage_toggle).call(this, false);
            }, this.duration);
        }
        else {
            this.element.classList.remove("is-active");
        }
    }
};
//# sourceMappingURL=flash-message.js.map