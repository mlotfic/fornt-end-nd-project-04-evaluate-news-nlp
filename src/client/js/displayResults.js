import { mapPolarityLabel } from './mapPolarityLabel';  

/**
 * Formats and displays API results in a user-friendly format.
 *
 * @function displayResults
 * @param {HTMLElement} resultsOutput - The DOM element where results will be displayed.
 * @param {Object} data - The data to be displayed, typically the API response. The structure must include:
 * - {string} score_tag - The overall sentiment polarity tag.
 * - {Array<Object>} sentence_list - An array of sentence objects, each containing:
 *   - {string} text - The sentence text.
 *   - {string} score_tag - The sentiment polarity tag for the sentence.
 * @throws Will throw an error if `resultsOutput` is not a valid DOM element or `data` is not properly structured.
 * @example
 * const resultsOutput = document.querySelector('#results');
 * const apiResponse = {
 *   score_tag: "P",
 *   sentence_list: [
 *     { text: "I love this.", score_tag: "P+" },
 *     { text: "It's okay.", score_tag: "NEU" }
 *   ]
 * };
 * displayResults(resultsOutput, apiResponse);
 */
function displayResults(resultsOutput, data) { 
    if (!(resultsOutput instanceof HTMLElement)) {
        throw new Error('Invalid input: resultsOutput must be a DOM element');
    }
    if (!data || typeof data !== 'object' || !Array.isArray(data.sentence_list)) {
        throw new Error('Invalid input: data must be a valid API response object');
    }

    // Clear previous results in the output container
    resultsOutput.textContent = '';

    // Render Overall Polarity
    const overallPolarity = mapPolarityLabel(data.score_tag);
    const overallDiv = document.createElement('div');
    overallDiv.classList.add('polarity');
    overallDiv.textContent = `Overall Polarity: ${overallPolarity.label}`;
    resultsOutput.appendChild(overallDiv);

    // Render Sentence-Level Polarities
    data.sentence_list.forEach(sentence => {
        const sentencePolarity = mapPolarityLabel(sentence.score_tag);
        const sentenceDiv = document.createElement('div');
        // Ensure cssClass is not empty
        if (sentencePolarity.cssClass) {
            sentenceDiv.classList.add('sentence', sentencePolarity.cssClass);
        } else {
            sentenceDiv.classList.add('unknown'); // Fallback to a default class
        }
        sentenceDiv.textContent = `${sentence.text} - ${sentencePolarity.label}`;
        resultsOutput.appendChild(sentenceDiv);
    });
}

// Export functions for use in other modules.
export { displayResults };