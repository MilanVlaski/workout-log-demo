/**
 * Depends on shoelace, and sl-input and sl-button being loaded.
 */
class TrackExercise extends HTMLElement {
    connectedCallback() {
        const exerciseName = this.getAttribute('name') || 'Exercise';
        this.innerHTML = /*html*/`
            <sl-card class="exercise-form">

                <div slot="header">
                    <h1 contentEditable>${exerciseName}</h1>
                    <sl-icon-button name="x" label="Exit"></sl-icon-button>
                </div>

                <form class="sets">
                    <div class="set">

                        <div class="repss">
                            <sl-input class="reps" name="reps"></sl-input>
                            <sl-button class="reps" variant="primary">
                                <sl-icon name="plus"></sl-icon>
                            </sl-button>

                        </div>

                        <sl-input placeholder="Weight" name="weight" class="weight"></sl-input>
                    </div>

                    <div class="controls">
                        <sl-input label="Number of sets" type="number" placeholder="Sets" value="1" min="1" max="12"></sl-input>
                        <sl-input label="Comment" placeholder="Add a comment?" name="comment"></sl-input>
                        <div class="actions">
                            <div>
                                <sl-button variant="danger" outline type="reset">Clear</sl-button>
                                <sl-button variant="primary" outline>New weight</sl-button>
                            </div>
                            <sl-button type="submit" variant="primary">Finish</sl-button>
                        </div>
                    </div>

                    </fieldset>

                </form>
            </sl-card>
            `
    }


}

customElements.define('track-exercise', TrackExercise);
