const axios = require('axios');
async function getFullQuestion() {

    response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: 'list only one sentence from a random language with a translation like this template(Language-sentence-translation)',
        max_tokens: 300,
        n: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your API key
        }
      });
    const question = response.data.choices[0].text.trim().split('-');

    const correct_language = question[0];
    const sentence = question[1];
    const translate = question[2];

    // Get language options
    response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: 'Send three language names seperated by - and excluding '+correct_language+' like this template(Language1-Language2-Language3)',
        max_tokens: 20,
        n: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your API key
        }
      });

    const language_options = response.data.choices[0].text.trim().split('-');

    language_options.push(correct_language);
    shuffleArray(language_options);
    
    return {language:correct_language,sentence:sentence,translate:translate,choices:language_options};
  }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

exports.getFullQuestion = getFullQuestion;