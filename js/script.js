/**
 * Main script for workout logger application
 * Handles form submissions and exercise creation
 */

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function () {

    const startExerciseForm = document.querySelector('start-exercise form');

    if (startExerciseForm) {
        startExerciseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const exerciseInput = startExerciseForm.querySelector('sl-input[name="exercise"]');
            const exerciseName = exerciseInput.value;

            if (exerciseName && exerciseName.trim()) {
                const trackExercise = document.createElement('track-exercise');
                trackExercise.setAttribute('name', exerciseName.trim());

                startExerciseForm.parentElement.appendChild(trackExercise);


                // Clear the input field for next exercise
                // exerciseInput.value = '';

                // Exercise input can go, as the current input is bein
                startExerciseForm.remove();

                // Scroll to the newly created exercise
                trackExercise.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Handle the exit button on track-exercise components
    document.addEventListener('click', function (e) {
        let exitButton = e.target.closest('sl-icon-button[name="x"]')
        if (e.target.closest && exitButton) {
            const trackExercise = exitButton.closest('track-exercise');

            if (trackExercise) {
                // Remove the track-exercise component when exit button is clicked
                trackExercise.remove();
            }
        }
    });
});