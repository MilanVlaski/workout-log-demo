import {el} from "../utils.js"

class TrackExercise extends HTMLElement {
    initialData = null

    
    connectedCallback() {
        const exerciseName = this.getAttribute('name') || 'Exercise'

        // this.initialData = {
        //     setsWithWeight: [{
        //         weight: "120kg",
        //         sets: [1, 2, 3, 5, 1, 1, 5, 5, 5]
        //     },
        //     {
        //         weight: "120kg",
        //         sets: [1, 2, 3, 5, 1, 1, 5, 5, 5]
        //     },
        // ],
        //     comment: "Bla bla bla"
        // }

        this.innerHTML = this.html(exerciseName);
        this.setupGroups();
    }

    setupGroups() {
        // 1. Identify all distinct groups in the DOM
        const groups = this.querySelectorAll('.set-group');

        groups.forEach((group) => {
            // 2. Scoping within the block: these variables are locked to this iteration
            const setInput = group.querySelector('.set-counter');
            const addSetBtn = group.querySelector('sl-button.reps');

            // Bind directly to the scoped element
            setInput.addEventListener('sl-change', (event) => {
                this.handleSetCountChange(group, event.target.value);
            });

            addSetBtn.addEventListener('click', () => {
                const newVal = (parseInt(setInput.value) || 0) + 1;
                setInput.value = newVal;
                this.handleSetCountChange(group, newVal);

                requestAnimationFrame(() => {
                    const allReps = group.querySelectorAll('sl-input.reps');
                    allReps[allReps.length - 1]?.focus();
                });
            });
        });
    }

    handleSetCountChange(group, numberOfSets) {
        const targetCount = Math.max(1, parseInt(numberOfSets) || 1);
        // Scoping the container selection to the passed group
        const container = group.querySelector('.repss');
        const addButton = container.querySelector('sl-button.reps');
        
        const currentInputs = Array.from(container.querySelectorAll('sl-input.reps'));
        
        if (currentInputs.length < targetCount) {
            const fragment = document.createDocumentFragment();
            for (let i = currentInputs.length; i < targetCount; i++) {
                fragment.appendChild(el('sl-input', { className: 'reps', name: 'reps' }));
            }
            container.insertBefore(fragment, addButton);
        } else {
            for (let i = currentInputs.length - 1; i >= targetCount; i--) {
                currentInputs[i].remove();
            }
        }
    }

    html(exerciseName) {
        return /*html*/`
    <form class="exercise-form">
        <div slot="header">
            <h1 contentEditable>${exerciseName}</h1>
            <sl-icon-button name="x" label="Exit"></sl-icon-button>
        </div>

        ${this.initialData?.setsWithWeight 
            ? this.initialData?.setsWithWeight.map(el => this.setGroupHtml(el)).join('') 
            : this.setGroupHtml()
        }
        <div class="controls">
            <sl-input label="Comment" placeholder="Add a comment?" name="comment" value="${this.initialData?.comment || ''}"></sl-input>
            <div class="actions">
                <sl-button variant="primary" outline id="add-weight-btn">New weight</sl-button>
                <sl-button type="submit" variant="primary">Finish</sl-button>
            </div>
        </div>
    </form>`;
    }

    setGroupHtml(group) {
        const weight = group?.weight || '';
        const sets = group?.sets || [];

        return /*html*/`
        <div class="set-group">
            <div class="set">
                <div class="repss">
                    ${this.repsHtml(sets)}
                    <sl-button class="reps" variant="primary">
                        <sl-icon name="plus"></sl-icon>
                    </sl-button>
                </div>
                <sl-input placeholder="Weight" name="weight" class="weight" value="${weight}"></sl-input>
            </div>
            <sl-input label="Number of sets" type="number" class="set-counter"
                value="${sets.length || 1}" min="1" max="12"></sl-input>
        </div>`;
    }

    repsHtml(sets) {
        const items = sets.length > 0 ? sets : [""];
        return items.map(val => /*html*/`
            <sl-input class="reps" name="reps" value="${val}"></sl-input>
        `).join('');
    }
}

customElements.define('track-exercise', TrackExercise);
