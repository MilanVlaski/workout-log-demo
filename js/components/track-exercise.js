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

    ${this.setGroupHtml(this.initialData?.setsWithWeight)}

        <div class="controls">
            <sl-input label="Number of sets" type="number" class="set-counter"
            placeholder="Sets" value="1" min="1" max="12"></sl-input>
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

        const setInput = this.querySelector('.set-counter');

        // sl-input is on every single input, while sl-change is not.
        setInput.addEventListener('sl-input', (event) => {
            this.handleSetCountChange(event.target.value);
        });

        const addSet = document.querySelector('sl-button.reps')

        addSet.addEventListener('click', () => {
            this.handleSetCountChange(++setInput.value)
        })
    }

handleSetCountChange(numberOfSets) {
    const targetCount = Math.max(1, parseInt(numberOfSets) || 1);
    const container = this.querySelector('.repss');
    const addButton = container.querySelector('sl-button.reps');
    
    // Get current inputs
    let currentInputs = Array.from(container.querySelectorAll('sl-input.reps'));
    
    if (currentInputs.length < targetCount) {
        // Add missing ones
        const fragment = document.createDocumentFragment();
        for (let i = currentInputs.length; i < targetCount; i++) {
            const newInput = document.createElement('sl-input');
            newInput.className = 'reps';
            newInput.setAttribute('name', 'reps');
            fragment.appendChild(newInput);
        }
        container.insertBefore(fragment, addButton);
    } else {
        // Remove excess from the end
        for (let i = currentInputs.length - 1; i >= targetCount; i--) {
            currentInputs[i].remove();
        }
    }
}

    setGroupHtml(group) {
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