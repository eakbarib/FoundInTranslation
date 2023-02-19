const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up a route to fetch data from OpenAI API and render the response using EJS
app.get('/', async (req, res) => {
  try {
    // Fetch data from OpenAI API using Axios
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: 'list only one sentence from a random language with a translation like this template(Language-idiom-translation)',
      max_tokens: 300,
      n: 1,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your API key
      }
    });

    // Render the response using EJS
    res.render('index', { data: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
