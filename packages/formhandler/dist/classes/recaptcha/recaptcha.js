export default class Recaptcha {
    constructor(config) {
        this.src = config.src;
        this.key = config.key;
    }
    addScript() {
        const script = document.createElement("script");
        script.src = this.src;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    setToken(token) {
        sessionStorage.setItem("recaptcha-token", token);
        sessionStorage.setItem("recaptcha-valid", "true");
    }
    waitUntilValid() {
        return new Promise((resolve) => {
            sessionStorage.setItem("recaptcha-valid", "false");
            const interval = setInterval(() => {
                if (sessionStorage.getItem("recaptcha-valid") === "true") {
                    clearInterval(interval);
                    resolve(true);
                }
            }, 50);
        });
    }
}
//# sourceMappingURL=recaptcha.js.map