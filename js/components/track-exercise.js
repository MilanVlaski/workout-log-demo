import { el } from "../utils.js"
import { Events } from "../events.js"

class TrackExercise extends HTMLElement {
    initialData = null

    static mainTemplate = Object.assign(document.createElement('template'), {
        innerHTML: /*html*/`
        <form class="exercise-form">
            <div slot="header">
                <h1 contentEditable></h1>
                <sl-icon-button name="x" label="Exit"></sl-icon-button>
            </div>

            <!-- SetGroups -->
            <div class="controls">
                <sl-input label="Comment" placeholder="Add a comment?" name="comment"></sl-input>
                <div class="actions">
                    <sl-button variant="primary" outline id="add-weight-btn">New weight</sl-button>
                    <sl-button type="submit" variant="primary">Finish</sl-button>
                </div>
            </div>
        </form>`
    })


    connectedCallback() {
        const exerciseName = this.getAttribute('name') || 'Exercise'

        this.initialData = {
            setsWithWeight: [{
                weight: "120kg",
                sets: [1, 2, 3, 5, 1, 1, 5, 5, 5]
            },
                // {
                //     weight: "120kg",
                //     sets: [1, 2, 3, 5, 1, 1, 5, 5, 5]
                // },
            ],
            comment: "Bla bla bla"
        }

        this.replaceChildren(this.dom(exerciseName));
    }

    dom(exerciseName) {
        const main = TrackExercise.mainTemplate.content.cloneNode(true)

        main.querySelector('h1')
            .textContent = exerciseName

        const form = main.querySelector('form');
        const controls = main.querySelector('.controls');

        main.querySelector('[name="comment"')
            .value = this.initialData?.comment || ''
        const setGroups = this.initialData?.setsWithWeight || [null];


        setGroups.forEach(data => { form.insertBefore(this.setGroup(data), controls); });

        return main;
    }

    setGroup(group) {
        // HTML
        const main = document.createRange().createContextualFragment(/*html*/`
        <div class="set-group">
            <div class="set">
                <div class="repss">
                <!-- Repss -->
                    <sl-button class="reps" variant="primary">
                        <sl-icon name="plus"></sl-icon>
                    </sl-button>
                </div>
                <sl-input placeholder="Weight" name="weight" class="weight"></sl-input>
            </div>
            <sl-input label="Number of sets" type="number" class="set-counter" min="1" max="12"></sl-input>
        </div>`);

        const setCounter = main.querySelector('.set-counter')

        main.querySelector('[name="weight"')
            .value = group?.weight || ''

        setCounter.value = group?.sets?.length || 1

        const repss = main.querySelector('.repss');
        const plusBtn = main.querySelector('sl-button.reps');
        repss.insertBefore(this.reps(group?.sets || []), plusBtn);


        // BEHAVIOR

        setCounter.addEventListener('sl-change', (event) => {
            // 2. Create the custom event
            setCounter.dispatchEvent(new CustomEvent(Events.SET_COUNT_CHANGED, {
                detail: { setCount: event.target.value },
                bubbles: true,
                // composed: true               // Allows the event to pass through Shadow DOM boundaries
            }));
        });

        const setGroup = main.querySelector('.set-group')
        setGroup.addEventListener(Events.SET_COUNT_CHANGED, (e) => {
            handleSetCountChange(e.detail.setCount)
        })

        // If we want encapsulation, repss can be moved into a component which is told 
        // to execute a function similar to this one
        function handleSetCountChange(numberOfSets) {
            const targetCount = Math.max(1, parseInt(numberOfSets) || 1);
            // Scoping the container selection to the passed group

            const currentInputs = Array.from(repss.querySelectorAll('sl-input.reps'));

            if (currentInputs.length < targetCount) {
                // Add inputs
                const fragment = document.createDocumentFragment();
                for (let i = currentInputs.length; i < targetCount; i++) {
                    fragment.appendChild(el('sl-input', { className: 'reps', name: 'reps' }));
                }
                repss.insertBefore(fragment, plusBtn);
            } else {
                // Remove inputs
                for (let i = currentInputs.length - 1; i >= targetCount; i--) {
                    currentInputs[i].remove();
                }
            }
        }

        plusBtn.addEventListener('click', () => {
            plusBtn.dispatchEvent(new CustomEvent(Events.ADD_SETS, { bubbles: true, }))
        })

        setGroup.addEventListener(Events.ADD_SETS, () => {
            handleAddSets()
        })

        function handleAddSets() {
            handleSetCountChange(++setCounter.value);

            // Because the element gets created in the function above, giving it focus is troublesome.
            requestAnimationFrame(() => {
                const allReps = repss.querySelectorAll('sl-input.reps');
                allReps[allReps.length - 1]?.focus();
            });
        }

        this.setGroup
        return main;
    }

    reps(sets) {
        const items = sets.length > 0 ? sets : [""];
        const fragment = document.createDocumentFragment();

        items.forEach(val => {
            fragment.appendChild(el('sl-input', { className: 'reps', name: 'reps', value: val }));
        });

        return fragment;
    }
}

customElements.define('track-exercise', TrackExercise);
