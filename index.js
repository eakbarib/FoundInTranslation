const express = require('express');
const app = express();
const Question = require('./models/question');

// Constants
const port = 3000;



// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



// Set up a route to fetch data from OpenAI API and render the response using EJS
app.get('/', async (req, res) => {
    try {
    // Render the response using EJS
    res.render('index');
    //correct_language:question.language,sentence:question.sentence,translate:question.translate,language_options:question.choices
    } 
    catch (error) {
        console.error(error);
        res.send('Error fetching data');
    }
});

app.get('/q/:id', async (req, res) => {
    try {
        const question = await Question.getQuestion(req.params.id);
        // Render the response using EJS
        //correct_language:question.language,sentence:question.sentence,translate:question.translate,language_options:question.choices
        res.send(question); 
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


