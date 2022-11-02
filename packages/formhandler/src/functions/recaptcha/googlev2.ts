import Recaptcha from "./recaptcha";

export default class GoogleV2 extends Recaptcha {
  constructor(key: string) {
    super({
      src: `https://www.google.com/recaptcha/api.js?render=${key}`,
      key,
    });
  }

  async refresh() {
    // @ts-ignore
    await this.waitUntilValid();
    console.log("Turnstile refreshed");
  }
  setInputToken(formData: FormData) {
    if (!this.token) return;
    formData.append("g-recaptcha-response", this.token);
  }
}
