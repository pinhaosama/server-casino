const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8'});
const port = 3000;

const {authenticateAnswer} = require('./my-modules/question.js');


app.use(cors({
    origin: 'http://localhost:5000'
}));

app.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Headers', 'task');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.sendStatus(200);
});

app.get('/', async function(req, res) {

    console.log('req.headers: ', req.headers); 

    const reqOrigin = req.headers['origin'];
    const reqTask = req.headers['task'];

    console.log("Processing request from " + reqOrigin + " for route " + req.url + " with method " + req.method + " for task: " + reqTask);


    try {

        const authResult = await authenticateAnswer(req);
        console.log(authResult);

        if (authResult == true) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
            res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');


            res.send("right answer!!");
        } else if (authResult == false){
            res.send('wrong answer :/');
        } 
    }
    catch (error) {
        console.log('authenticateUser() error:', error);
        res.status(500).send("Server Error");
    }

    res.end();
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
    console.log('Hello World!');
});