class WorkoutLog extends HTMLElement {

    

    connetedCallback() {
        const existingWorkoutLog = JSON.parse(sessionStorage.getItem('workoutLog'))
        if(existingWorkoutLog === null || existingWorkoutLog.workouts.isEmpty()) {
            this.innerHTML('<h1></h1>')
        }
    }
}

customElements.define('workout-log', WorkoutLog)
