class Header extends HTMLElement {
    connectedCallback() {
        const currentPage = this.getCurrentPage();

        this.innerHTML = /*html*/`
        <header>
        <sl-button-group label="Navigation">
            <sl-button href="index.html" pill ${currentPage === 'index.html' ? 'variant="primary"' : ''}>Workout</sl-button>
            <sl-button href="workout-log.html" pill ${currentPage === 'workout-log.html' ? 'variant="primary"' : ''}>Log</sl-button>
        </sl-button-group>
        </header>
        `
    }

    getCurrentPage() {
        // Get the current page filename from the URL
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        return page || 'index.html';
    }
}

customElements.define('mv-header', Header)
