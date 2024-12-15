# Front-End Nanodegree Project: Evaluate News Article with NLP App with Webpack

## Overview

This project is a front-end application built with Node.js and Webpack. It allows users to submit text for analysis using a server API. The app features client-side interactivity, modular code, and integration of development and production build setups using Webpack.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Development Setup](#development-setup)
5. [Production Build](#production-build)
6. [Testing](#testing)
7. [File Structure](#file-structure)
8. [License](#license)

---

## Features

- **Client-side interactivity** with modular JavaScript files.
- **Webpack** for bundling, with separate configurations for development and production.
- **Express.js** backend for handling API requests.
- **Environment Variables** management using `dotenv`.
- **SCSS styles** for modern CSS styling.
- **Jest** for unit testing client-side functions.

---

## Technologies Used

- **Frontend:** HTML, SCSS, JavaScript
- **Backend:** Node.js, Express.js
- **Build Tools:** Webpack, Babel, PostCSS
- **Testing:** Jest
- **Utilities:** dotenv, nodemon, clean-webpack-plugin

---

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mlotfic/fornt-end-nd-project-04-evaluate-news-nlp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fornt-end-nd-project-04-evaluate-news-nlp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your `.env` file with the following variables:

   ```env
   API_KEY=your-meaningcloud-api-key
   PORT=3000
   ```

[(Back to top)](#table-of-contents)

---

## Usage

### Development Setup

Run the development server with hot module replacement:

```bash
npm run build-dev
```

The app will be served at `http://localhost:3000/`.

---

### Production Build

1. Build the production files:

   ```bash
   npm run build-prod
   ```

2. Start the production server:

   ```bash
   npm start
   ```

The app will be served at the port specified in the `.env` file or the default port.

[(Back to top)](#table-of-contents)

---

### Testing

Run Jest tests with:

```bash
npm test
```

Tests are located in the `__tests__` directory and are written for client-side JavaScript functions.

[(Back to top)](#table-of-contents)

---

## API Information: MeaningCloud Sentiment Analysis

This project uses the [MeaningCloud Sentiment Analysis API](https://www.meaningcloud.com/products/sentiment-analysis) to process text input. The API provides detailed sentiment information, including:

- Global sentiment (positive, negative, neutral)
- Subjectivity (objective or subjective)
- Confidence score
- Irony detection

### API Endpoint

`POST https://api.meaningcloud.com/sentiment-2.1`

### Required Parameters

- `key`: Your API key (from `.env`).
- `txt`: The text to analyze.
- `lang`: The language code (e.g., `en` for English).

[(Back to top)](#table-of-contents)

---

## File Structure

```css
root    / 
        ├── src/ 
        │   ├── client/ 
        │   │   ├── js/ 
        │   │   │   ├── displayResults.js 
        │   │   │   ├── mapPolarityLabel.js 
        │   │   │   └── setMessage.js
        │   │   ├── styles/ 
        │   │   │   ├── base.scss 
        │   │   │   ├── footer.scss 
        │   │   │   ├── form.scss 
        │   │   │   ├── header.scss 
        │   │   │   └── resets.scss 
        │   │   ├── views/ 
        │   │   │   └── index.html 
        │   │   ├── index.js 
        │   └── server/ 
        │       ├── index.js 
        │       └── analyzeText.js 
        ├── dist/ (auto-generated after build) 
        ├── __test__/ (for Jest tests) 
        │   ├── displayResults.test.js 
        │   ├── mapPolarityLabel.test.js 
        │   └── setMessage.test.js 
        ├── .env (for API keys) 
        ├── .babelrc 
        ├── .gitignore 
        ├── package.json 
        ├── README.md 
        ├── webpack.dev.js 
        └── webpack.prod.js 
```

[(Back to top)](#table-of-contents)

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

[(Back to top)](#table-of-contents)

---

## **Acknowledgments**

- [Udacity](https://www.udacity.com/) for the project structure and guidance.
- [meaningcloud](https://www.meaningcloud.com/developer/apis) for their free API.

[(Back to top)](#table-of-contents)