const workoutLog = document.getElementById('workout-log')
const workout = document.getElementById('workout')
const exercise = document.getElementById('exercise')

const workoutLogTemplate = workoutLog.content.cloneNode(true).firstElementChild
const workoutTemplate = workout.content.cloneNode(true).firstElementChild
const exerciseTemplate = exercise.content.cloneNode(true).firstElementChild

export {
    workoutLogTemplate,
    workoutTemplate,
    exerciseTemplate,
}
