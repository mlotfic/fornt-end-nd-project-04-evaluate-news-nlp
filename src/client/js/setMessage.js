/**
 * Module: setMessage.js
 * 
 * This module provides a helper function to set a message with a specified style in a UI element.
 *
 * Functions:
 * - setMessage(resultsOutput, message, type): Sets the message content and applies a style class.
 *
 * @module setMessage
 */

/**
 * Sets a message in a specified output element with a given style class.
 *
 * @function setMessage
 * @param {HTMLElement} resultsOutput - The DOM element where the message will be displayed.
 * @param {string} message - The message text to display.
 * @param {string} type - The style class to apply (e.g., 'success', 'error').
 * @example
 * const resultsOutput = document.querySelector('#message');
 * setMessage(resultsOutput, 'Operation successful!', 'success');
 */
function setMessage(resultsOutput, message, type) {
    resultsOutput.textContent = message;
    resultsOutput.classList.add(type);
}

// Export functions for use in other modules.
export { setMessage };
