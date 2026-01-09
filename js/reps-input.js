/**
 * Use repsInput.cloneNode(true) to create new reps inputs.
 * The html element in which this is used is expected to have a copy of <template id="reps-input">.
 */
export const repsInputTemplate = document.getElementById('reps-input').content.cloneNode(true).firstElementChild
