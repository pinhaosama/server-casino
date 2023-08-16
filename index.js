const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const textBodyParser = bodyParser.text({ limit: '20mb', defaultCharset: 'utf-8'});
const port = 3000;


app.get('/', (req, res) => {
    console.log('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});