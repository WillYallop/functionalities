import Recaptcha from "./recaptcha";
export default class Turnstile extends Recaptcha {
    constructor(key: string);
    initialise(formEle: HTMLFormElement): void;
    refresh(): Promise<boolean>;
}
//# sourceMappingURL=turnstile.d.ts.map