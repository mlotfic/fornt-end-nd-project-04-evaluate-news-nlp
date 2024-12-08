/**
 * Jest tests for setMessage.js
 *
 * These tests verify the functionality of the following client-side functions:
 * - setMessage: Sets a message with appropriate content and styling.
 */

import { setMessage } from '../src/client/js/setMessage';

describe('setMessage Function', () => {
    let mockResultsOutput;

    /**
     * Set up a mock div element before each test.
     */
    beforeEach(() => {
        mockResultsOutput = document.createElement('div');
    });

    /**
     * Test to ensure the message text is set correctly and the specified class is applied.
     */
    test('should set the message text and apply the specified class', () => {
        const mockMessage = 'Operation completed successfully';
        const mockType = 'success';

        setMessage(mockResultsOutput, mockMessage, mockType);

        expect(mockResultsOutput.textContent).toBe(mockMessage);
        expect(mockResultsOutput.classList.contains(mockType)).toBe(true);
    });

    /**
     * Test to verify functionality for different message types (e.g., success, error).
     */
    test('should handle different message types', () => {
        const mockMessage = 'An error occurred';
        const mockType = 'error';

        setMessage(mockResultsOutput, mockMessage, mockType);

        expect(mockResultsOutput.textContent).toBe(mockMessage);
        expect(mockResultsOutput.classList.contains(mockType)).toBe(true);
    });
});
