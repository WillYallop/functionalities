import Recaptcha from "./recaptcha";

const ID = "turnstile-con";

export default class Turnstile extends Recaptcha {
  constructor(key: string) {
    super({
      src: "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback",
      key,
    });
  }
  // ----------------------------------------
  // public methods
  initialise(formEle: HTMLFormElement) {
    this.addScript();
    // Add dom element
    const div = document.createElement("div");
    div.id = ID;
    formEle.appendChild(div);

    // Add on load callback
    // @ts-ignore
    window.onloadTurnstileCallback = () => {
      // @ts-ignore
      turnstile.render(`#${ID}`, {
        sitekey: this.key,
        callback: (token: string) => {
          this.setToken(token);
        },
      });
    };
  }
  async refresh() {
    // @ts-ignore
    turnstile.reset(`#${ID}`);
    await this.waitUntilValid();
    return true;
  }
}
