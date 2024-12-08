/**
 * Server-side Node.js application for App
 */

/* ---- import dependencies ---- */ 
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const path       = require('path');

/* ---- import modules ---- */
const { analyzeText } = require('./analyzeText.js');

// Load environment variables from .env file
require('dotenv').config();

/* ---- import secret var ---- */ 
const API_KEY = process.env.API_KEY;
const PORT    = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Validate API_KEY
if (!API_KEY) {
    console.error('API_KEY is missing. Please set it in your .env file.');
    process.exit(1);
}

// API endpoint
const endpoint = "https://api.meaningcloud.com/sentiment-2.1";

// Start up an instance of app
const app  = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server

/**
 * GET '/analyze': Perform analysis using MeaningCloud API
 */
app.get('/analyze', async (req, res) => {
    try {
        // Check if textToAnalyze exists
        if (!req.query.textToAnalyze) {
            return res.status(400).send({
                success: false,
                error: 'Missing textToAnalyze parameter in the query string.',
            });
        }

        const textToAnalyze = req.query.textToAnalyze;

        console.log(" ::: GET:test textToAnalyze ::: ",textToAnalyze);

        // Call the analyzeText function
        const result = await analyzeText(textToAnalyze, endpoint, API_KEY);

        console.log(" ::: GET:test analyzeText fun ::: ",textToAnalyze);

        if (result.success) {
            console.log('::: Analysis Result :::', result.data);
            return res.status(200).send(result);
        } else {
            console.error('::: Analysis Error :::', result.error);
            return res.status(500).send(result); // Return the structured error response
        }
    } catch (error) {
        console.error('Error during analysis:', error.message);
        res.status(500).send({
            success: false,
            error: 'Internal server error. Please try again later.',
        });
    }
});

/**
 * POST '/analyze': Save text to analyze for further processing
 */
app.post('/analyze', (req, res) => {
    const textToAnalyze = req.body.formText;

    console.log(" ::: test ::: ",textToAnalyze);

    if (!textToAnalyze) {
        return res.status(400).send({
            success: false,
            error: 'formText is required in the request body.',
        });
    }

    console.log('::: Received textToAnalyze :::', textToAnalyze);

    res.status(200).send({
        success: true,
        message: 'textToAnalyze received successfully.',
    });
});

// Handle other routes
app.get('/main.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'dist/main.css'));
});

// Handle other routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});