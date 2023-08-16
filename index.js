const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8'});
const port = 3000;


app.use(cors({
    origin: 'http://localhost:5000'
}));

app.get('/', (req, res) => {
    const loginResult = authenticateAnswer(req);

    if (loginResult == true) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Expose-Headers', 'request-result'); 
        res.setHeader('request-result', 'Request ' + req.method + ' was received successfully.');


        console.log('right answer')
    } else {
        console.log('wrong answer')
    }
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
    console.log('Hello World!');
});