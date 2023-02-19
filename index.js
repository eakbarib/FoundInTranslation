const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
const port = 3000;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Set up a route to fetch data from OpenAI API and render the response using EJS
app.get('/', async (req, res) => {
  try {
    // Fetch data from OpenAI API using Axios
    response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: 'list only one sentence from a random language with a translation like this template(Language-idiom-translation)',
      max_tokens: 300,
      n: 1,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your API key
      }
    });

    const extractData = response.data.choices[0].text.split('-');

    response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: 'Send three language names seperated by - (no numbers)',
        max_tokens: 20,
        n: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your API key
        }
      });

    const lang = response.data.choices[0].text.split('-');

    lang.push(extractData[0]);
    
    shuffleArray(lang);

    // Render the response using EJS
    res.render('index', { data: {language:extractData[0],sentence:extractData[1],translate:extractData[2],language_options:lang} });
  } catch (error) {
    console.error(error);
    res.send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

