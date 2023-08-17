const fs = require('fs');

const answerData = './data/answers.json';

async function authenticateAnswer(req) {

    const queryAnswer = req.query;

    return new Promise((resolve, reject) => {
        fs.readFile(answerData, 'utf-8', (err, fileData) => {
            if (err) {
                reject(err);
                return;
            }

            const answers = JSON.parse(fileData);

            if (queryAnswer == answers["math"]) {
                resolve(true);
            } else {
                console.log(queryAnswer);
                console.log(answers["math"]);
                resolve(false);
            }
        });
    });
}

module.exports = {authenticateAnswer};