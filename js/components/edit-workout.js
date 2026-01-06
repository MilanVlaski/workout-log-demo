import { template, el } from "./../utils.js"
import { Events } from "./../events.js"
import "./start-exercise.js"
import "./track-exercise.js"

class EditWorkout extends HTMLElement {

    static mainTemplate = template(/*html*/`
    <sl-card class="workout">
        <div slot="header">
            <h1></h1>
            <sl-format-date month="long" day="numeric" year="numeric"></sl-format-date>
        </div>

        <start-exercise></start-exercise>

    </sl-card>
    `)

    connectedCallback() {
        this.replaceChildren(this.main());
    }

    main() {
        const main = EditWorkout.mainTemplate.content.cloneNode(true)

        const workout = main.querySelector('.workout')

        workout.querySelector('h1').textContent = 'Workout'

        workout.addEventListener('formdata', (e) => {
            e.preventDefault()

            if (e.target.getAttribute('action') === 'startExercise') {

                console.log(Object.fromEntries(e.formData))
                workout.querySelector('start-exercise').remove()
                const exercise = e.formData.get('exercise')

                const trackExerciseELement = document.createElement('track-exercise')
                trackExerciseELement.setAttribute('name', exercise)

                workout.appendChild(trackExerciseELement)
            }
        })

        workout.addEventListener(Events.FINISH_WORKOUT, (e) => {
            // add element to log-exercise
        })

        return main
    }
}

customElements.define('edit-workout', EditWorkout)
