const fs = require('fs'); // import fs module
const { parse } = require("csv-parse"); // import csv-parse into a 'parse' object

async function readCsvFile(file) {
    return new Promise((resolve, reject) => {
        const results = [];

        const input = fs.createReadStream(file);
        input
            .pipe(parse({ delimiter: ',' }))
            .on('data', function (dataRow) {
                // Data row received from the parse object
                // add dataRow to the results array:
                if (!dataRow.includes('Value')) {
                    results.push({ Value: dataRow[0], Suit: dataRow[1] });
                }
            })
            .on('end', function () {
                // End of parsing
                // resolve Promise 
                // with the parsed data in the results array
                resolve(results);
            }).on('error', function (err) {
                // Reject the Promise with the error
                reject(err);
            });
    });
}

function shuffle(deck) {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
    return deck;
}

module.exports = {
    readCsvFile,
    shuffle
};