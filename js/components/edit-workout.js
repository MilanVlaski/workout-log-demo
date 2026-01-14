/**
 * Workout Logger Demo
 * (c) 2026 Milan Vlaški | All Rights Reserved.
 * Provided "as is" without warranty. 
 * See legal.html for full proprietary notice and liability disclaimer.
 */

import { template, el } from "./../utils.js"
import { Events } from "./../events.js"
import "./start-exercise.js"
import { TrackExercise } from "./track-exercise.js";
import "./current-workout.js"

// Always escape HTML for text arguments!
function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

// Custom function to emit toast notifications
function notify(message, variant = 'primary', icon = 'info-circle', duration = 3000) {
    const alert = Object.assign(document.createElement('sl-alert'), {
        variant,
        closable: true,
        duration: duration,
        innerHTML: `
            <sl-icon name="${icon}" slot="icon"></sl-icon>
            ${escapeHtml(message)}
        `
    });

    document.body.append(alert);
    return alert.toast();
}

class EditWorkout extends HTMLElement {

    static mainTemplate = template(/*html*/`
    <sl-card class="workout">
        <div slot="header">
            <!-- <h1>Workout</h1> -->
            <sl-format-date month="long" day="numeric" year="numeric"></sl-format-date>
        </div>

        <start-exercise></start-exercise>
        <sl-divider></sl-divider>
        <current-workout></current-workout>
    </sl-card>
    `)

    connectedCallback() {
        this.replaceChildren(this.main());
    }

    main() {
        const main = EditWorkout.mainTemplate.content.cloneNode(true)

        const workout = main.querySelector('.workout')
        const divider = main.querySelector('sl-divider')

        workout.addEventListener('submit', (e) => {
            if (e.target.getAttribute('action') === 'startExercise') {
                e.preventDefault()
                const trackExerciseELement = new TrackExercise()
                const exercise = new FormData(e.target).get('exercise')
                trackExerciseELement.setAttribute('name', exercise)
                workout.insertBefore(trackExerciseELement, divider)
                e.target.reset()
            }
        })

        workout.addEventListener(Events.FINISH_EXERCISE, (e) => {
            document.querySelector('current-workout')
                .addExercise(e.detail)
            e.target.remove()
        })

        // Listen for workout finish event to show toast notification
        workout.addEventListener(Events.FINISH_WORKOUT, (e) => {
            notify('Workout completed successfully!', 'success', 'check2-circle', 5000);

            // Store workout data in session storage
            const workoutData = e.detail;

            // Get existing workoutLog from session storage or initialize empty array
            const existingWorkoutLog = JSON.parse(sessionStorage.getItem('workoutLog')) || {workouts: []}

            // Add current workout data to the array
            existingWorkoutLog.workouts.push({
                date: new Date().toISOString(),
                exercises: workoutData.exercises
            });

            // Store updated workoutLog back in session storage
            sessionStorage.setItem('workoutLog', JSON.stringify(existingWorkoutLog));

            document.querySelector('current-workout').clear()
        })

        return main
    }
}

customElements.define('edit-workout', EditWorkout)
