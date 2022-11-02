import Recaptcha from "./recaptcha";
export default class GoogleV2 extends Recaptcha {
    constructor(key: string);
    refresh(): Promise<void>;
    setInputToken(formData: FormData): void;
}
//# sourceMappingURL=googlev2.d.ts.map