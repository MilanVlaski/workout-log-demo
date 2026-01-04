/**
 * Depends on shoelace, and sl-input and sl-button being loaded.
 */
class TrackExercise extends HTMLElement {

    // Define the static constant using the class name later
    static setInput = /*html*/`<sl-input class="reps" name="reps"></sl-input>`

    initialData = null

    connectedCallback() {
        const exerciseName = this.getAttribute('name') || 'Exercise'

        // for testing component display
        // this.initialData = {
        //     setsWithWeight: {
        //         weight: "120kg",
        //         sets: [1, 2, 3, 5, 1, 1, 5,5,5,]
        //     },
        //     comment: "Bla bla bla"
        // }

        this.innerHTML = /*html*/`

<sl-card class="exercise-form">
    <div slot="header">
        <h1 contentEditable>${exerciseName}</h1>
        <sl-icon-button name="x" label="Exit"></sl-icon-button>
    </div>

    ${this.createSetGroupHtml(this.initialData?.setsWithWeight)}

        <div class="controls">
            <sl-input label="Number of sets" type="number" placeholder="Sets" value="1" min="1" max="12"></sl-input>
            <sl-input label="Comment" placeholder="Add a comment?" name="comment" value="${this.initialData?.comment || ''}"></sl-input>
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

    createSetGroupHtml(group) {
        const weight = group?.weight || '';
        const sets = group?.sets || [];

        return /*html*/`
        <div class="set">
            <div class="repss">
                ${this.repsHtml(sets)}
                <sl-button class="reps" variant="primary">
                    <sl-icon name="plus"></sl-icon>
                </sl-button>
            </div>
            <sl-input placeholder="Weight" name="weight" class="weight" value="${weight}"></sl-input>
        </div>
    `;
    }

    repsHtml(sets) {
        if (!sets || sets.length === 0) {
            return /*html*/`<sl-input class="reps" name="reps"></sl-input>`;
        }

        return sets.map(val => /*html*/`
        <sl-input class="reps" name="reps" value="${val}"></sl-input>
    `).join('');
    }
}

customElements.define('track-exercise', TrackExercise);