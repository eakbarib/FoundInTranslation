const axios = require('axios');
const json = require('json');

async function getQuestions() {
    try {
        response = await axios.get('https://foundintranslation-8863a-default-rtdb.firebaseio.com/questions.json');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.getQuestions = getQuestions;