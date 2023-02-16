import Recaptcha from "./recaptcha";

const ID = "googlev2-con";

export default class GoogleV2 extends Recaptcha {
  instance: any;
  constructor(key: string) {
    super({
      src: `https://www.google.com/recaptcha/api.js?onload=onloadGoogleCallback&render=explicit`,
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

    // @ts-ignore
    window.onloadGoogleCallback = () => {
      // @ts-ignore
      this.instance = grecaptcha.render(ID, {
        sitekey: this.key,
        size: "invisible",
        callback: (token: string) => {
          this.setToken(token);
        },
      });
    };
  }
  async refresh() {
    // @ts-ignore
    grecaptcha.reset(this.instance);
    // @ts-ignore
    grecaptcha.execute();
    await this.waitUntilValid();
  }
}
