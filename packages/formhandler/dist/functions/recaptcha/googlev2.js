import Recaptcha from "./recaptcha";
export default class GoogleV2 extends Recaptcha {
    constructor(key) {
        super({
            src: `https://www.google.com/recaptcha/api.js?render=${key}`,
            key,
        });
    }
    async refresh() {
        await this.waitUntilValid();
        console.log("Turnstile refreshed");
    }
    setInputToken(formData) {
        if (!this.token)
            return;
        formData.append("g-recaptcha-response", this.token);
    }
}
//# sourceMappingURL=googlev2.js.map