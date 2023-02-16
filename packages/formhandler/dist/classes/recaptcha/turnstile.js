var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Recaptcha from "./recaptcha";
const ID = "turnstile-con";
export default class Turnstile extends Recaptcha {
    constructor(key) {
        super({
            src: "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback",
            key,
        });
    }
    initialise(formEle) {
        this.addScript();
        const div = document.createElement("div");
        div.id = ID;
        formEle.appendChild(div);
        window.onloadTurnstileCallback = () => {
            turnstile.render(`#${ID}`, {
                sitekey: this.key,
                callback: (token) => {
                    this.setToken(token);
                },
            });
        };
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            turnstile.reset(`#${ID}`);
            yield this.waitUntilValid();
            return true;
        });
    }
}
//# sourceMappingURL=turnstile.js.map