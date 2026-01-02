import {discover} from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js";

/**
 * Depends on shoelace.
 * The combination of input and button is somewhat of a hack, but can in theory
 * be extracted into a reusable component. When such a component becomes necessary, it will be created.
 */
class StartExercise extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

connectedCallback() {
  if (this.shadowRoot.hasChildNodes()) return;

  this.shadowRoot.innerHTML = this.html(
    this.getAttribute('label'),
    this.getAttribute('placeholder'),
    this.getAttribute('action-text')
  );

  // Shoelace's autoloader doesn't scan our web components.
  // Therefore, on the first custom component that uses, say, an sl-input,
  // discover should be called.
  discover(this.shadowRoot);
}


  html(label, placeholder, actionText) {
    return /*html*/`
        <style>
          sl-input > sl-button {
            margin-inline-end: 0;
          }
        </style>

        <form action="startExercise" method="post">
          <sl-input label="${label}" placeholder="${placeholder}" name="exercise" required>
            <sl-button type="submit" variant="primary" slot="suffix">${actionText}</sl-button>
          </sl-input>
        </form>
      `;
  }
}

customElements.define('start-exercise', StartExercise);
