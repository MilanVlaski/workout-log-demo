
const workoutLogTemplate = document.getElementById('workout-log').content.cloneNode(true).firstElementChild
const workoutTemplate = document.getElementById('workout').content.cloneNode(true).firstElementChild
const exerciseTemplate = document.getElementById('exercise').content.cloneNode(true).firstElementChild

class WorkoutLog extends HTMLElement {


    connectedCallback() {
        // Default
        const $workoutLog = workoutLogTemplate.cloneNode(true)

        const existingWorkoutLog = JSON.parse(sessionStorage.getItem('workoutLog'))
        console.log(existingWorkoutLog)
        if (!existingWorkoutLog || existingWorkoutLog.workouts.length === 0) {
            $workoutLog.querySelector('h1').textContent = "No workouts yet."
        } else {
            existingWorkoutLog.workouts.forEach(workout => {
                const $workout = workoutTemplate.cloneNode(true)

                $workout.querySelector('h2').textContent
                $workout.querySelector('sl-format-date').date = workout.date
                const $edit = document.createElement('sl-button')
                $edit.innerText = 'Edit'
                $edit.setAttribute('data-action', 'edit-workout')
                $workout.querySelector('.actions').appendChild($edit)

                workout.exercises.forEach(exercise => {
                    const $exercise = exerciseTemplate.cloneNode(true)
                    $exercise.textContent = escapeHtml(formatExercise(exercise))
                    $workout.appendChild($exercise)
                })

                $workoutLog.appendChild($workout)
            })
        }

        this.replaceChildren($workoutLog)
    }


    
}

function formatExercise(exercise) {
    const setsString = exercise.setsWithWeight
        .map(sw => `${sw.sets.join(', ')} ${sw.weight}`)
        .join(' ');

    return `${exercise.name}: ${setsString}`;
}

function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

customElements.define('workout-log', WorkoutLog)
