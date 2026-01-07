import { template, el } from "./../utils.js"
import { Events } from "./../events.js"
import "./start-exercise.js"
import { TrackExercise } from "./track-exercise.js";
import "./workout-log.js"

class EditWorkout extends HTMLElement {

    static mainTemplate = template(/*html*/`
    <sl-card class="workout">
        <div slot="header">
            <h1></h1>
            <sl-format-date month="long" day="numeric" year="numeric"></sl-format-date>
        </div>

        <start-exercise></start-exercise>
        <sl-divider></sl-divider>
        <workout-log></workout-log>
    </sl-card>
    `)

    connectedCallback() {
        this.replaceChildren(this.main());
    }

    main() {
        const main = EditWorkout.mainTemplate.content.cloneNode(true)

        const workout = main.querySelector('.workout')
        const divider = main.querySelector('sl-divider')

        // Read from queryvalues?
        workout.querySelector('h1').textContent = 'Workout'

        workout.addEventListener(Events.START_EXERCISE, (e) => {
            const trackExerciseELement = new TrackExercise()
            trackExerciseELement.setAttribute('name', e.detail.exercise)
            workout.insertBefore(trackExerciseELement, divider)
        })

        workout.addEventListener(Events.FINISH_WORKOUT, (e) => {
            // add element to log-exercise
            // workoutLog.addExercise(data...)
        })

        return main
    }
}

customElements.define('edit-workout', EditWorkout)
