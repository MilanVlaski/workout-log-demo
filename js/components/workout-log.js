import { Events } from "../events.js"
import { repsInputTemplate } from "../reps-input.js"
import { template, el, clone } from "./../utils.js"



export class WorkoutLog extends HTMLElement {

    static mainTemplate = template(/*html*/`
    <form class="workout-log">
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
                    name: 'Squat',
                    setsWithWeight: [
                        { weight: '120kg', sets: [5, 5, 5, 4, 3, 3] },
                        { weight: '130kg', sets: [10, 9, 3] }
                    ]
                }
            ]
        }

        const container = WorkoutLog.mainTemplate.content.cloneNode(true).firstElementChild

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

            container.dispatchEvent(new CustomEvent(Events.FINISH_EXERCISE, { detail: finalData, bubbles: true }));
        })

        this.replaceChildren(container)
    }

    exercise(exercise) {
        const skeleton = document.createElement('div')
        skeleton.classList.add('sets')
        skeleton.appendChild(el('p', { textContent: exercise.exercise }))

        // TODO set className is nonsense. It's "exercise"
        exercise.setsWithWeight.forEach((setGroup) => {
            skeleton.appendChild(this.setGroup(setGroup))
        })

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
        this.querySelector('.workout-log')
            .insertBefore(this.exercise(exercise), actions)
    }

    clear() {
        const container = WorkoutLog.mainTemplate.content.cloneNode(true)
        this.replaceChildren(container)
    }

}

customElements.define('workout-log', WorkoutLog)
