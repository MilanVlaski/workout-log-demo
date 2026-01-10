
const workoutLogTemplate = document.getElementById('workout-log').content.cloneNode(true).firstElementChild
const workoutTemplate = document.getElementById('workout').content.cloneNode(true).firstElementChild
const exerciseTemplate = document.getElementById('exercise').content.cloneNode(true).firstElementChild

class WorkoutLog extends HTMLElement {


    connectedCallback() {
        // Default
        const $workoutLog = workoutLogTemplate.cloneNode(true)
        
        const existingWorkoutLog = JSON.parse(sessionStorage.getItem('workoutLog'))
        console.log(existingWorkoutLog)
        if(!existingWorkoutLog || existingWorkoutLog.workouts.length === 0) {
            $workoutLog.querySelector('h1').textContent = "No workouts yet."
        } else {
            $workoutLog.querySelector('h1').textContent = "TODO"
        }

        this.replaceChildren($workoutLog)
    }
}

customElements.define('workout-log', WorkoutLog)
