import "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js"

class StartExercise extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const label = this.getAttribute('label');
        const placeholder = this.getAttribute('placeholder');
        const actionText = this.getAttribute('action-text');

        this.shadowRoot.innerHTML = `
        <style>
          sl-input > sl-button {
            margin-inline-end: 0;
          }
        </style>

        <form>
          <sl-input label="${label}" placeholder="${placeholder}" name="input">
            <sl-button type="submit" variant="primary" slot="suffix">${actionText}</sl-button>
          </sl-input>
        </form>
      `;
    }
}

customElements.define('start-exercise', StartExercise);