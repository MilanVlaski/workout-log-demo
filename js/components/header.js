class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/`
        <header>
        <nav>
            <a href="edit-workout.html">Home</a>
            <a href="workout-log.html">Log</a>
        </nav>
        </header>
        `
    }
}

customElements.define('mv-header', Header)
