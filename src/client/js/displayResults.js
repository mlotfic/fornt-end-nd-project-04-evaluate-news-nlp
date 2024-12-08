/**
 * Module: displayResults.js
 * 
 * This module provides a function to display API results in a user-friendly format.
 *
 * Functions:
 * - displayResults(resultsOutput, data): Formats and displays the API results in a specified output element.
 *
 * @module displayResults
 */

/**
 * Formats and displays API results in a user-friendly format.
 *
 * @function displayResults
 * @param {HTMLElement} resultsOutput - The DOM element where results will be displayed.
 * @param {Object} data - The data to be displayed, typically the API response.
 * @example
 * const resultsOutput = document.querySelector('#results');
 * const apiResponse = { status: 'ok', message: 'Success' };
 * displayResults(resultsOutput, apiResponse);
 */
function displayResults(resultsOutput, data) {
    // Format JSON for readability
    const formattedData = JSON.stringify(data, null, 2);

    // Add a success class to the results output
    resultsOutput.classList.add('success');

    // Set the value of the textarea with the formatted data
    resultsOutput.value = formattedData;
}

// Export functions for use in other modules.
export { displayResults };