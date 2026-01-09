import { repsInputTemplate } from "../reps-input.js"
import { template, el, clone } from "./../utils.js"



export class WorkoutLog extends HTMLElement {

    static mainTemplate = template(/*html*/`
    <div class="workout-log">
        <h2>Workout Log</h2>

        <!-- logs -->

        <div class="actions">
            <sl-button variant="danger" outline type="reset">Clear</sl-button>
            <sl-button type="submit" variant="primary">Finish</sl-button>
        </div>
    </div>
    `)

    initialData = null


    connectedCallback() {

        const container = WorkoutLog.mainTemplate.content.cloneNode(true)

        const actions = container.querySelector('.actions')

        this.initialData?.exercises.forEach(exercise => {
            container.insertBefore(this.exercise(exercise), actions)
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

}

customElements.define('workout-log', WorkoutLog)
