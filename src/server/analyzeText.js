/**
 * Function to analyze text using the MeaningCloud API.
 * 
 * @param {string} textToAnalyze - The text or URL to analyze.
 * @param {string} endpoint - The MeaningCloud API endpoint (e.g., topics-2.0, sentiment-2.1).
 * @param {string} api_key - Your MeaningCloud API key.
 * @param {string} [model='general'] - The model to use for analysis (default is 'general').
 * @returns {Promise<Object>} - The response object with success or error details for the client.
 */
async function analyzeText(textToAnalyze, endpoint, api_key, model = 'general') {
    // Validate input parameters
    if (!textToAnalyze || !endpoint || !api_key) {
        return {
            success: false,
            error: 'Missing required parameters: textToAnalyze, endpoint, or api_key',
        };
    }

    // Regex for URL validation
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-._~:/?#[\]@!$&'()*+,;=%]*)?$/;

    // Determine if the input is a URL or text
    const isURL = urlPattern.test(textToAnalyze);

    // Prepare API parameters
    const params = new URLSearchParams({
        key: api_key,
        lang: 'en',   // Language of the text (e.g., English)
        model: model, // Analysis model (default is 'general')
    });

    if (isURL) {
        params.append('url', textToAnalyze);
    } else {
        params.append('txt', textToAnalyze);
    }

    try {
        // Make the API request
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });
        
        // Check for HTTP errors
        if (!response.ok) {
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${response.statusText}`,
            };
        }

        // Parse the JSON response
        const data = await response.json();

        // Check API-specific errors in the response payload
        if (data.status?.code !== '0') {
            return {
                success: false,
                error: `API Error: ${data.status.msg || 'Unknown error'}`,
            };
        }

        return {
            success: true,
            data: data,
        };

    } catch (error) {
        return {
            success: false,
            error: `Network or server error: ${error.message}`,
        };
    }
}

// Export the function for external use
module.exports = { analyzeText };
