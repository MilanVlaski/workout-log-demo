import { Events } from "../events.js"
import { repsInputTemplate } from "../reps-input.js"
import { template, el, clone } from "../utils.js"



export class CurrentWorkout extends HTMLElement {

    static mainTemplate = template(/*html*/`
    <form class="current-workout">
        <h2>Workout Log</h2>

        <!-- logs -->

        <div class="actions">
            <sl-button variant="danger" outline data-action="clear-workout-log">Clear</sl-button>
            <sl-button type="submit" variant="primary">Finish</sl-button>
        </div>
    </form>
    `)

    initialData = null


    connectedCallback() {

        this.initialData = {
            exercises: [
                {
                    exercise: 'Squat',
                    setsWithWeight: [
                        { weight: '120kg', sets: [5, 5, 5, 4, 3, 3] },
                        { weight: '130kg', sets: [10, 9, 3] }
                    ],
                    comment: 'Form was shaky.'
                },
                {
                    exercise: 'Pullups',
                    setsWithWeight: [
                        { weight: '120kg', sets: [5, 5, 5, 4, 3, 3] },
                        { weight: '130kg', sets: [10, 9, 3] }
                    ],
                    comment: 'Felt strong today!'
                }
            ]
        }

        const container = CurrentWorkout.mainTemplate.content.cloneNode(true).firstElementChild

        const actions = container.querySelector('.actions')

        this.initialData?.exercises.forEach(exercise => {
            container.insertBefore(this.exercise(exercise), actions)
        })

        // BEHAVIOR

        this.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="clear-workout-log"]')) {
                this.clear()
            }
        })

        this.addEventListener(`submit`, (e) => {
            e.preventDefault();

            // Gather all exercise data from the form
            const finalData = { exercises: [] };

            // Find all exercise elements
            const exerciseElements = container.querySelectorAll('.sets');

            exerciseElements.forEach(exerciseElement => {
                const exerciseName = exerciseElement.querySelector('p')?.textContent || 'Unknown Exercise';

                const exerciseData = {
                    name: exerciseName,
                    setsWithWeight: []
                };

                // Find all set groups within this exercise
                const setGroups = exerciseElement.querySelectorAll('.set');

                setGroups.forEach(setGroup => {
                    const weightInput = setGroup.querySelector('.weight');
                    const weight = weightInput ? weightInput.value : null;

                    // Find all rep inputs in this set group
                    const repInputs = setGroup.querySelectorAll('.reps');
                    const sets = [];

                    repInputs.forEach(repInput => {
                        sets.push(parseInt(repInput.value) || 0);
                    });

                    if (sets.length > 0) {
                        exerciseData.setsWithWeight.push({
                            weight: weight,
                            sets: sets
                        });
                    }
                });

                // Add comment if it exists
                const commentInput = exerciseElement.querySelector('.exercise-comment');
                if (commentInput && commentInput.value) {
                    exerciseData.comment = commentInput.value;
                }

                if (exerciseData.setsWithWeight.length > 0) {
                    finalData.exercises.push(exerciseData);
                }
            });

            // Dispatch the event with the final data
            container.dispatchEvent(new CustomEvent(Events.FINISH_WORKOUT, {
                detail: finalData,
                bubbles: true
            }));
        })

        this.replaceChildren(container)
    }

    exercise(exercise) {
        const skeleton = document.createElement('div')
        skeleton.classList.add('sets')

        const header = document.createElement('header')

        // Create X button using proper Shoelace component creation
        const xButton = document.createElement('sl-icon-button')
        xButton.setAttribute('name', 'x')
        xButton.setAttribute('label', 'Exit')

        header.appendChild(xButton)
        header.appendChild(el('p', { textContent: exercise.exercise }))
        skeleton.appendChild(header)

        // TODO set className is nonsense. It's "exercise"
        exercise.setsWithWeight?.forEach((setGroup) => {
            skeleton.appendChild(this.setGroup(setGroup))
        })

        // Add comment as editable sl-input if it exists
        if (exercise.comment) {
            const commentInput = el('sl-input', {
                placeholder: 'Comment',
                value: exercise.comment,
                className: 'exercise-comment'
            })
            skeleton.appendChild(commentInput)
        }

        // Use onclick like track-exercise component for better compatibility
        xButton.onclick = () => skeleton.remove()

        return skeleton
    }


    setGroup(setGroup) {
        const fragment = document.createDocumentFragment()

        const setGroupDiv = el('div', { className: 'set' })
        const repss = el('div', { className: 'repss' })

        const weight = setGroup.weight ? template(/*html*/`<sl-input placeholder="Weight" name="weight" class="weight"></sl-input>`)
            .content.cloneNode(true).firstElementChild
            : el('div')
        weight.value = setGroup.weight

        setGroup.sets.forEach((reps) => {
            const repsInput = repsInputTemplate.cloneNode()
            repsInput.value = reps
            repss.appendChild(repsInput)
        })
        setGroupDiv.appendChild(repss)
        setGroupDiv.appendChild(weight)
        fragment.appendChild(setGroupDiv)

        return fragment
    }

    addExercise(exercise) {
        const actions = this.querySelector('.actions')
        this.querySelector('.current-workout')
            .insertBefore(this.exercise(exercise), actions)
    }

    clear() {
        const container = CurrentWorkout.mainTemplate.content.cloneNode(true)
        this.replaceChildren(container)
    }

}

customElements.define('current-workout', CurrentWorkout)
