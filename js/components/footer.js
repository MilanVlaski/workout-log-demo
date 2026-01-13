// Copyright (c) 2026 [Your Name]. All Rights Reserved.
// Proprietary and Confidential. See LEGAL.txt for full disclaimer.

class Footer extends HTMLElement {

    connectedCallback() {
        this.innerHTML = /*html*/`
        <footer>
            <nav>
                <a href="legal.html">Legal & Privacy</a>
            </nav>
            <p>© 2026 Milan Vlaški</p>
        </footer>
        `
    }

}

customElements.define('mv-footer', Footer)
