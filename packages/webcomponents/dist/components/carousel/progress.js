class Progress extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
        this.initialAttributes();
    }
    render() {
        this.innerHTML = `<div class="cprogress_con"></div>`;
    }
    initialAttributes() {
        if (!this.id) {
            this.id = `carousel-progress-${this.container.index}`;
        }
    }
    start(duration) {
        this.stop();
        const start = performance.now();
        const stop = start + duration;
        const animate = (timestamp) => {
            if (timestamp > stop) {
                this.stop();
            }
            else {
                this.update(timestamp - start);
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
    stop() {
        this.update(0);
    }
    update(progress) {
        const percentage = (progress / this.container.duration) * 100;
        this.container.progress.style.width = `${percentage}%`;
    }
    get container() {
        return this.parentElement;
    }
    get direction() {
        return this.getAttribute("direction") || "horizontal";
    }
}
export default Progress;
//# sourceMappingURL=progress.js.map