const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const { roulette } = require('./my_modules/roulette.js');
const { readCsvFile, shuffle } = require('./my-modules/blackjack-server.js');


app.use(cors({
    origin: 'http://localhost:5000'
}));

app.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Headers', 'task');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.sendStatus(200);
});

app.get('/blackjack', async function (req, res) {
    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers);

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    // TASK Check
    if (reqTask === 'blackjack') {
        try {
            let csvFileData = await readCsvFile('./data/Cards.csv');
            csvFileData = shuffle(csvFileData);

            // prepare and send the response to the client:
            res.setHeader('Access-Control-Allow-Origin', '*');
            // allow client to access the custom 'request-result' header:
            res.setHeader('Access-Control-Expose-Headers', 'request-result');
            // set the custom header 'request-result'
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
            res.status(200).json(csvFileData);
        } catch (error) {
            console.log('There was a problem: ', error);
            res.status(500).send("Server Error");
        }
    }
});

app.get('/roulette', async function (req, res) {
    const { roulette } = require('./my_modules/roulette.js');

    // print the HTTP Request Headers
    console.log('req.headers: ', req.headers);

    const reqOrigin = req.headers['origin']; // get the origin of the request
    const reqTask = req.headers['task']; // get the task of the request

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);

    // TASK Check
    if (reqTask === 'roulette') {
        try {
            const rouletteResult = await roulette(req);
            console.log(rouletteResult);

            // prepare and send the response to the client:
            res.setHeader('Access-Control-Allow-Origin', '*');
            // allow client to access the custom 'request-result' header:
            res.setHeader('Access-Control-Expose-Headers', 'request-result');
            // set the custom header 'request-result'
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');
            res.status(200).send(rouletteResult);
        } catch (error) {
            console.log('There was a problem: ', error);
            res.status(500).send("Server Error");
        }
    }
    res.end();
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});