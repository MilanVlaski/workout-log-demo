
const workoutLogTemplate = document.getElementById('workout-log').content.cloneNode(true).firstElementChild
const workoutTemplate = document.getElementById('workout').content.cloneNode(true).firstElementChild
const exerciseTemplate = document.getElementById('exercise').content.cloneNode(true).firstElementChild

class WorkoutLog extends HTMLElement {


    connectedCallback() {
        const initialData = {
            workouts: [{
                exercises: [
                    {
                        name: 'Squat',
                        setsWithWeight: [
                            { weight: '120kg', sets: [5, 5, 5, 4, 3, 3] },
                            { weight: '130kg', sets: [10, 9, 3] }
                        ],
                        comment: 'Form was shaky.'
                    },
                    {
                        name: 'Pullups',
                        setsWithWeight: [
                            { weight: '120kg', sets: [5, 5, 5, 4, 3, 3] },
                            { weight: '130kg', sets: [10, 9, 3] }
                        ],
                        comment: 'Felt strong today!'
                    }
                ],
                date: new Date().toISOString()
            }
            ]
        }
        sessionStorage.setItem('workoutLog', JSON.stringify(initialData))

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

                workout.exercises.forEach(exercise => {
                    const $exercise = exerciseTemplate.cloneNode(true)
                    $exercise.textContent = formatExercise(exercise)
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


customElements.define('workout-log', WorkoutLog)
