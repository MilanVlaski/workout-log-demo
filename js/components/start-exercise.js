/**
 * Depends on shoelace.
 * The combination of input and button is somewhat of a hack, but can in theory
 * be extracted into a reusable component. When such a component becomes necessary, it will be created.
 */
class StartExercise extends HTMLElement {

  connectedCallback() {
    this.innerHTML = /*html*/`
        <style>
          sl-input > sl-button {
            margin-inline-end: 0;
          }
        </style>

        <div id="startExercise">
          <form action="startExercise" method="post">
            <sl-input label="Start New Exercise" placeholder="Exercise name" name="exercise" required>
              <sl-button type="submit" variant="primary" slot="suffix">Start</sl-button>
            </sl-input>
          </form>
        </div>
      `
  }
}

customElements.define('start-exercise', StartExercise);
