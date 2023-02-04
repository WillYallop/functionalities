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
export default class GoogleV2 extends Recaptcha {
    constructor(key) {
        super({
            src: `https://www.google.com/recaptcha/api.js?render=${key}`,
            key,
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitUntilValid();
            console.log("Turnstile refreshed");
        });
    }
    setInputToken(formData) {
        if (!this.token)
            return;
        formData.append("g-recaptcha-response", this.token);
    }
}
//# sourceMappingURL=googlev2.js.map