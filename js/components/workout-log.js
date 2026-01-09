import { template, el, clone } from "./../utils.js"


export class WorkoutLog extends HTMLElement {

    initialData = null


    connectedCallback() {
        // this.initialData = {
        //     exercises: [{
        //         name: 'Pullups',
        //         // reps with weight
        //         setsWithWeight: [{
        //             weight: "120kg",
        //             // reps
        //             sets: [10, 9, 8, 7]
        //         }, {
        //             weight: "100kg",
        //             sets: [11, 8, 8]
        //         }],
        //     }],
        //     comment: "Form was shaky."
        // }

        const container = document.createElement('div')
        container.className = 'workout-log'

        container.appendChild(el('h2', { textContent: "Workout log" }))

        this.initialData?.exercises.forEach(exercise => {
            container.appendChild(this.exercise(exercise))
        });

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

        const weight = template(/*html*/`<sl-input placeholder="Weight" name="weight" class="weight"></sl-input>`)
            .content.cloneNode(true)
        weight.querySelector('[name="weight"]').value = setGroup.weight

        setGroup.sets.forEach((reps) => {
            const repsInput = clone('reps-input')
            repsInput.value = reps
            repss.appendChild(repsInput)
        })
        setGroupDiv.appendChild(repss)
        setGroupDiv.appendChild(weight)
        fragment.appendChild(setGroupDiv)

        return fragment
    }

    addExercise(exercise) {
        document.querySelector('.workout-log')
        .appendChild(this.exercise(exercise))
    }

}

customElements.define('workout-log', WorkoutLog)
