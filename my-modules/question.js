const fs = require('fs');

const answerData = './data/answers.json';

async function authenticateAnswer(req) {

    const {answer} = req.query;

    return new Promise((resolve, reject) => {
        fs.readFile(answerData, 'utf-8', (err, fileData) => {
            if (err) {
                reject(err);
                return;
            }

            const questions = JSON.parse(fileData);

            if (answer == questions["math"].answer) {
                resolve(true);
            } else {
                console.log(answer);
                console.log(questions["math"].answer);

                resolve(false);
            }
        });
    });
}

module.exports = {authenticateAnswer};