import Recaptcha from "./recaptcha";

const ID = "turnstile-con";

export default class Turnstile extends Recaptcha {
  constructor(key: string) {
    super({
      src: "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback",
      key,
    });
    this.#initialise();
  }
  #initialise() {
    this.addScript();
    // Add dom element
    const div = document.createElement("div");
    div.id = ID;

    // find form
    const form = document.querySelector("form");
    if (!form) return;
    form.appendChild(div);

    // Add on load callback
    // @ts-ignore
    window.onloadTurnstileCallback = () => {
      // @ts-ignore
      turnstile.render(`#${ID}`, {
        sitekey: this.key,
        callback: (token: string) => {
          console.log("hello");
          this.setToken(token);
        },
      });
    };
  }

  // ----------------------------------------
  // public methods

  async refresh() {
    // @ts-ignore
    turnstile.reset(`#${ID}`);
    await this.waitUntilValid();
    return true;
  }
  // sets token on form data
  setInputToken(formData: FormData) {
    if (!this.token) return;
    formData.append("cf-turnstile", this.token);
  }
}
