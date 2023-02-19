interface ConfigProps {
    src: string;
    key: string;
}
export default class Recaptcha {
    src: string;
    key: string;
    constructor(config: ConfigProps);
    addScript(): void;
    setToken(token: string): void;
    waitUntilValid(): Promise<unknown>;
}
export {};
//# sourceMappingURL=recaptcha.d.ts.map