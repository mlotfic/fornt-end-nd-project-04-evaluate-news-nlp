/**
 * Jest tests for displayResults.js
 *
 * These tests verify the functionality of the following client-side functions:
 * - displayResults: Ensures API results are formatted, displayed, and styled correctly.
 */

import { displayResults } from '../src/client/js/displayResults';

describe('displayResults Function', () => {
    let mockResultsOutput;

    /**
     * Set up a mock textarea element before each test.
     */
    beforeEach(() => {
        mockResultsOutput = document.createElement('textarea');
    });

    /**
     * Test to ensure results are formatted as JSON, displayed in the textarea,
     * and the success class is applied.
     */
    test('should display formatted results and apply success class', () => {
        const mockData = { status: 'ok', message: 'Test passed' };

        displayResults(mockResultsOutput, mockData);

        expect(mockResultsOutput.value).toBe(JSON.stringify(mockData, null, 2));
        expect(mockResultsOutput.classList.contains('success')).toBe(true);
    });
});