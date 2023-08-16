const fs = require('fs');

const answers = './data/answers.json';

async function authenticateAnswer(req) {

    const answer = req.query;

    return new Promise((resolve, reject) => {
        fs.readFile(answers, 'utf-8', (err, fileData) => {
            if (err) {
                reject(err);
                return;
            }

            const answersF = JSON.parse(fileData);

            if (answersF[answer] === password) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = {authenticateAnswer};