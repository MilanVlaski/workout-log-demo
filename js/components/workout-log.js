import { template, el } from "./../utils.js"

export class WorkoutLog extends HTMLElement {

    initialData = null

    static skeleton = template(/*html*/`
        <fieldset class="sets">
        <!-- 
            <legend>Exercise</legend>
            
            <div class="set"> // name is nonsense, should be "setGroup"
                <div class="repss">
                    <sl-input class="reps" value="12"></sl-input>
                    <sl-input class="reps" value="11"></sl-input>
                    <sl-input class="reps" value="9"></sl-input>
                </div>

                <sl-input placeholder="Weight" name="weight" value="120kg"></sl-input>
            </div>
                -->

        </fieldset>    
    `)

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

        const fragment = document.createDocumentFragment()

        fragment.appendChild(el('h2', { textContent: "Workout log" }))

        this.initialData?.exercises.forEach(exercise => {
            fragment.appendChild(this.exercise(exercise))
        });

        this.replaceChildren(fragment)
    }

    exercise(exercise) {
        const skeleton = document.createElement('div')
        skeleton.classList.add('sets')
        skeleton.appendChild(el('p', { textContent: exercise.name }))

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
            repss.appendChild(el('sl-input', { className: 'reps', value: reps }))
        })
        setGroupDiv.appendChild(repss)
        setGroupDiv.appendChild(weight)
        fragment.appendChild(setGroupDiv)

        return fragment
    }

}

customElements.define('workout-log', WorkoutLog)
