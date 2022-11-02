import Recaptcha from "./recaptcha";
export default class Turnstile extends Recaptcha {
    #private;
    constructor(key: string);
    refresh(): Promise<boolean>;
    setInputToken(formData: FormData): void;
}
//# sourceMappingURL=turnstile.d.ts.map