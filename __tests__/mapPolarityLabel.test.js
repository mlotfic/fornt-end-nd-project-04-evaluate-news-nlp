import { mapPolarityLabel } from '../src/client/js/mapPolarityLabel.js';

describe('mapPolarityLabel', () => {
    test('returns correct label and CSS class for valid score tags', () => {
        expect(mapPolarityLabel('P+')).toEqual({ label: "Strong positive sentiment", cssClass: "strong-positive" });
        expect(mapPolarityLabel('P')).toEqual({ label: "Positive sentiment", cssClass: "positive" });
        expect(mapPolarityLabel('NEU')).toEqual({ label: "Neutral sentiment", cssClass: "neutral" });
        expect(mapPolarityLabel('N')).toEqual({ label: "Negative sentiment", cssClass: "negative" });
        expect(mapPolarityLabel('N+')).toEqual({ label: "Strong negative sentiment", cssClass: "strong-negative" });
        expect(mapPolarityLabel('NONE')).toEqual({ label: "No sentiment detected", cssClass: "" });
    });

    test('returns unknown sentiment for invalid score tags', () => {
        expect(mapPolarityLabel('INVALID')).toEqual({ label: "Unknown sentiment", cssClass: "" });
    });

    test('throws error for non-string input', () => {
        expect(() => mapPolarityLabel(123)).toThrow('Invalid input: scoreTag must be a string');
        expect(() => mapPolarityLabel({})).toThrow('Invalid input: scoreTag must be a string');
        expect(() => mapPolarityLabel([])).toThrow('Invalid input: scoreTag must be a string');
    });
});
