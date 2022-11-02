import Recaptcha from "./recaptcha";
export default class Google extends Recaptcha {
    constructor(key) {
        super({
            src: `https://www.google.com/recaptcha/api.js?render=${key}`,
            key,
        });
    }
    setInputToken(formData) {
        if (!this.token)
            return;
        formData.append("g-recaptcha-response", this.token);
    }
}
//# sourceMappingURL=google.js.map