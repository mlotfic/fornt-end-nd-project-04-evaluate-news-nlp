/**
 * Maps a `scoreTag` from the sentiment analysis API to a descriptive label and CSS class.
 *
 * @function mapPolarityLabel
 * @param {string} scoreTag - The polarity score tag from the sentiment analysis API.
 * Valid values:
 * - "P+": Strong positive sentiment
 * - "P": Positive sentiment
 * - "NEU": Neutral sentiment
 * - "N": Negative sentiment
 * - "N+": Strong negative sentiment
 * - "NONE": No sentiment detected
 * @returns {Object} An object containing:
 * - {string} label - A human-readable description of the sentiment.
 * - {string} cssClass - A CSS class name corresponding to the sentiment for styling.
 * @example
 * const result = mapPolarityLabel("P+");
 * console.log(result); 
 * // { label: "Strong positive sentiment", cssClass: "strong-positive" }
 */
function mapPolarityLabel(scoreTag) {
    const polarityMap = {
      "P+": { label: "Strong positive sentiment", cssClass: "strong-positive" },
      "P": { label: "Positive sentiment", cssClass: "positive" },
      "NEU": { label: "Neutral sentiment", cssClass: "neutral" },
      "N": { label: "Negative sentiment", cssClass: "negative" },
      "N+": { label: "Strong negative sentiment", cssClass: "strong-negative" },
      "NONE": { label: "No sentiment detected", cssClass: "" }
    };
  
    return polarityMap[scoreTag] || { label: "Unknown sentiment", cssClass: "" };
  }

// Export functions for use in other modules.
export { mapPolarityLabel };