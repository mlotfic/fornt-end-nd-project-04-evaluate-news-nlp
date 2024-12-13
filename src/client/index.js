/**
 * Client-side JavaScript for App
 */

/* ---- import modules ---- */
import { displayResults } from './js/displayResults';
import { setMessage }     from './js/setMessage';

/* ---- import styles ---- */
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/resets.scss';

const baseURL = 'http://localhost:3001/'

/* --- UI variables --- */
// Input UI elements
const form          = document.getElementById('form');
const nameInput     = document.getElementById('name');

// Output UI elements
const resultsOutput = document.getElementById('results');

/* --- Event Listener --- */

// Event Listener: Input Focus Event
nameInput.addEventListener('blur', () => {
    console.log('::: Input has lost focus :::');
});

// Event Listener: Form Submit
form.addEventListener(`${baseURL}/submit`, async (event) => {
    event.preventDefault();

    // Clear any previous messages
    resultsOutput.textContent = '';
    resultsOutput.classList.remove('error', 'success');

    const input = nameInput.value.trim();

    // Validation: Input cannot be blank
    if (!input) {
        setMessage(resultsOutput, 'Error: The input field cannot be blank.', 'error');
        return;
    }

    // Send data to the server for analysis
    try {
        // POST input to the server
        const postResponse = await fetch(`${baseURL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formText: input }),
        });

        if (!postResponse.ok) {
            throw new Error('Failed to submit text for analysis.');
        }

        console.log('::: Text submitted successfully :::');

        // GET analysis result from the server
        const getResponse = await fetch(`${baseURL}/analyze?textToAnalyze=${encodeURIComponent(input)}`);

        if (!getResponse.ok) {
            throw new Error('Failed to retrieve analysis result.');
        }

        const data = await getResponse.json();

        if (data.success) {
            displayResults(resultsOutput, data.data);
        } else {
            throw new Error(data.error || 'Analysis failed.');
        }
    } catch (error) {
        setMessage(resultsOutput, `Error: ${error.message}`, 'error');
        console.error(error);
    }
});