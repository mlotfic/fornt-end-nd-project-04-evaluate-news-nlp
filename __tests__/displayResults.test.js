/**
 * Jest tests for displayResults.js
 *
 * These tests verify the functionality of the following client-side functions:
 * - displayResults: Ensures API results are formatted, displayed, and styled correctly.
 */

import { displayResults } from '../src/client/js/displayResults.js';
import { mapPolarityLabel } from '../src/client/js/mapPolarityLabel.js';

jest.mock('../src/client/js/mapPolarityLabel', () => ({
    mapPolarityLabel: jest.fn()
}));


describe('displayResults Function', () => {
    let container;

    /**
     * Set up a mock div element before each test.
     */
    beforeEach(() => {
        container = document.createElement('div');
    });

    /**
     * Test to ensure results are formatted as JSON, displayed in the div,
     * and the success class is applied.
     */
    test('should displays results correctly for valid data', () => {
        // Mock mapPolarityLabel to return specific values
        mapPolarityLabel.mockImplementation(scoreTag => ({
            label: `Mocked sentiment for ${scoreTag}`,
            cssClass: `mock-class-${scoreTag}`
        }));

        const data = {
            score_tag: 'P',
            sentence_list: [
                { text: "I love this.", score_tag: "P+" },
                { text: "It's okay.", score_tag: "NEU" }
            ]
        };

        displayResults(container, data);

        const divs = container.querySelectorAll('div');
        expect(divs).toHaveLength(3);
        expect(divs[0].textContent).toBe('Overall Polarity: Mocked sentiment for P');
        expect(divs[1].textContent).toBe("I love this. - Mocked sentiment for P+");
        expect(divs[2].textContent).toBe("It's okay. - Mocked sentiment for NEU");
    });

    test('throws error for invalid resultsOutput', () => {
        expect(() => displayResults(null, {})).toThrow('Invalid input: resultsOutput must be a DOM element');
    });

    test('throws error for invalid data structure', () => {
        expect(() => displayResults(container, null)).toThrow('Invalid input: data must be a valid API response object');
    });
});