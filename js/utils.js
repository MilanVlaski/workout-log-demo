/**
 * A lightweight "Hyperscript" utility for declarative DOM element creation.
 * * This function creates a DOM element and assigns properties (like className, 
 * id, value, or innerHTML) in a single step using Object.assign. It is 
 * significantly faster than innerHTML for repeated operations and safer 
 * than raw string interpolation.
 *
 * @param {string} tag - The HTML tag name to create (e.g., 'div', 'sl-input').
 * @param {Object} props - An object containing properties to assign to the element.
 * @returns {HTMLElement} The newly created and configured DOM element.
 * * @example
 * // Create a Shoelace input for exercise reps
 * const repInput = el('sl-input', {
 * className: 'reps',
 * name: 'reps',
 * value: '10',
 * helpText: 'Set 1'
 * });
 */
export function el(tag, props) { return Object.assign(document.createElement(tag), props) }
