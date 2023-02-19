const express = require('express');
const ejs = require('ejs');
const app = express();
const axios = require('axios');
const Question = require('./models/question');

// Constants
const port = 3000;



// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Set up a route to fetch data from OpenAI API and render the response using EJS
app.get('/', async (req, res) => {
    try {
    const question = await Question.getFullQuestion();
    // Render the response using EJS
    res.render('index', { data: {correct_language:question.language,sentence:question.sentence,translate:question.translate,language_options:question.choices} });
    } 
    catch (error) {
        console.error(error);
        res.send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

