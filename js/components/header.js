class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/`
        <header>
        <sl-button-group label="Navigation">
            <sl-button href="edit-workout.html" pill>Start Workout</sl-button>
            <sl-button href="workout-log.html" pill>Log</sl-button>
        </sl-button-group>
        </header>
        `
    }
}

customElements.define('mv-header', Header)
