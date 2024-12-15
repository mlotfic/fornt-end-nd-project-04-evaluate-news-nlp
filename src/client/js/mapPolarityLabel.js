/**
 * Maps the sentiment score tag to a label and a CSS class.
 *
 * @function mapPolarityLabel
 * @param {string} scoreTag - The sentiment score tag.
 * @returns {Object} - The mapped sentiment label and associated CSS class.
 * @throws {Error} - If the input is not a string.
 *
 * @example
 * mapPolarityLabel('P'); // { label: 'Positive sentiment', cssClass: 'positive' }
 */
function mapPolarityLabel(scoreTag) {
    if (typeof scoreTag !== 'string') {
        throw new Error("Invalid input: scoreTag must be a string");
    }

    const polarityMap = {
        "P+": { label: "Strong positive sentiment", cssClass: "strong-positive" },
        "P": { label: "Positive sentiment", cssClass: "positive" },
        "NEU": { label: "Neutral sentiment", cssClass: "neutral" },
        "N": { label: "Negative sentiment", cssClass: "negative" },
        "N+": { label: "Strong negative sentiment", cssClass: "strong-negative" },
        "NONE": { label: "No sentiment detected", cssClass: "" }
    };

    return polarityMap[scoreTag] || { label: "Unknown sentiment", cssClass: "unknown" };
}


// Export functions for use in other modules.
export { mapPolarityLabel };