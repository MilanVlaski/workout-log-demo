/**
 * Depends on shoelace, and sl-input and sl-button being loaded.
 */
class TrackExercise extends HTMLElement {

    // Define the static constant using the class name later
    static setInput = /*html*/`<sl-input class="reps" name="reps"></sl-input>`

    connectedCallback() {
        const exerciseName = this.getAttribute('name') || 'Exercise'
        
        const dataAttr = this.getAttribute('data')
        const data = JSON.parse(dataAttr)
        
        const repsHtml = this.repsHtml(data)

        this.innerHTML = /*html*/`
            <sl-card class="exercise-form">
                <div slot="header">
                    <h1 contentEditable>${exerciseName}</h1>
                    <sl-icon-button name="x" label="Exit"></sl-icon-button>
                </div>

                <form class="sets">
                    <div class="set">
                        <div class="repss">
                            ${repsHtml}
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
                </form>
            </sl-card>
            `;
    }

    repsHtml(data) {
        const input = TrackExercise.setInput;

        if (!data || !data.sets) {
            return input;
        } else {
            return Array(data.sets.length).fill(input).join('\n');
        }
    }
}

customElements.define('track-exercise', TrackExercise);