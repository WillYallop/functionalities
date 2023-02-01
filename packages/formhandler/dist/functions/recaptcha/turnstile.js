import Recaptcha from "./recaptcha";
const ID = "turnstile-con";
export default class Turnstile extends Recaptcha {
    constructor(key) {
        super({
            src: "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback",
            key,
        });
        this.#initialise();
    }
    #initialise() {
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
    }
    async refresh() {
        turnstile.reset(`#${ID}`);
        await this.waitUntilValid();
        return true;
    }
    setInputToken(formData) {
        if (!this.token)
            return;
        formData.append("cf-turnstile", this.token);
    }
}
//# sourceMappingURL=turnstile.js.map