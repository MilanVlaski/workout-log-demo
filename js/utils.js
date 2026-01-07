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
/**
 * Creates a dormant HTMLTemplateElement from an HTML string.
 * * This utility uses the `el` helper to create a `<template>` element and populates 
 * its `innerHTML`. Templates are not rendered in the DOM until they are cloned 
 * and appended, making them ideal for reusable UI structures like list items 
 * or form groups.
 *
 * @param {string} html - A string containing the HTML structure to be templated.
 * @returns {HTMLTemplateElement} The tetgmplate element containing the parsed HTML.
 * * @example
 * // 1. Define the template
 * const rowTemplate = template('<tr><td>Data</td></tr>');
 * * // 2. Use it in a component (cloning the .content)
 * const clone = rowTemplate.content.cloneNode(true);
 * document.querySelector('tbody').appendChild(clone);
 */
export function template(html) { return el('template', { innerHTML: html }) }

export function debugNode(node, text) {
    const temp = document.createElement('div')
    temp.appendChild(node.cloneNode(true))
    console.log(`${text} ${temp.innerHTML}`)
}
