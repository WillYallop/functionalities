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
var _Turnstile_instances, _Turnstile_initialise;
import Recaptcha from "./recaptcha";
const ID = "turnstile-con";
export default class Turnstile extends Recaptcha {
    constructor(key) {
        super({
            src: "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback",
            key,
        });
        _Turnstile_instances.add(this);
        __classPrivateFieldGet(this, _Turnstile_instances, "m", _Turnstile_initialise).call(this);
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            turnstile.reset(`#${ID}`);
            yield this.waitUntilValid();
            return true;
        });
    }
    setInputToken(formData) {
        if (!this.token)
            return;
        formData.append("cf-turnstile", this.token);
    }
}
_Turnstile_instances = new WeakSet(), _Turnstile_initialise = function _Turnstile_initialise() {
    this.addScript();
    const div = document.createElement("div");
    div.id = ID;
    const form = document.querySelector("form");
    if (!form)
        return;
    form.appendChild(div);
    window.onloadTurnstileCallback = () => {
        turnstile.render(`#${ID}`, {
            sitekey: this.key,
            callback: (token) => {
                this.setToken(token);
            },
        });
    };
};
//# sourceMappingURL=turnstile.js.map