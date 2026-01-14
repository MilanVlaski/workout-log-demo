// An even better pattern may be to simply put all components into one file, at least, all components
// that belong to the edit-workout, and then use them internally, while providing this template
// as a global variable in that file.

// It's important that this runs once. And this will run when the module is imported.
const repsInputElement = document.getElementById('reps-input')

/**
 * Use repsInput.cloneNode(true) to create new reps inputs.
 * The html element in which this is used is expected to have a copy of <template id="reps-input">.
 */
export const repsInputTemplate = repsInputElement.content.cloneNode(true).firstElementChild
