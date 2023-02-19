const axios = require('axios');

async function getQuestion(id) {
    try {
        response = await axios.get('https://foundintranslation-8863a-default-rtdb.firebaseio.com/questions/question'+id+'.json');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

exports.getQuestion = getQuestion;