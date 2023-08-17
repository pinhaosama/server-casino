const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const fs = require('fs'); // import fs module
const { parse } = require("csv-parse"); // import csv-parse into a 'parse' object


// CSVファイルのデータを非同期的に取得し、処理する
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



// スロットを止めるリクエストを受け取り、止まった番号が3つ揃っているかどうか判定する
// もし3つそろっていれば、CSVから点数情報を取得してスコアに加算し、結果をクライアントに返す
/*
   Receive a request to stop the slots, then determine if the three stopped numbers are matching. 
   If all three numbers match, retrieve score information from a CSV file, add it to the current score, 
   and return the result to the client.
*/

app.post('/slot', (req, res) => {

  // スロットの結果を判定し、必要な処理を行う
  /* Determine the outcome of the slots and perform the necessary action */

  const slotResults = calculateSlotResults();

  // スロットの結果が揃っているか判定
  /* Determine if the results of the slots are aligned. */

  const isMatching = results[0] === results[1] && results[0] === results[2];

  // 得点を計算
  /* Calculate the score. */

  if (isMatching) {
    // マッチした場合の処理（CSV ファイルからデータを取得し、得点を計算）
    /* Handling the match case (Fetching data from the CSV file and calculating the score) */
    // reward = ...（得点の計算）(/* Calculate the score. */)
    switch (results.join('')) { // join('')で、スロットの結果を文字列に結合
      case '111':
        reward = rewardData[1][2];
        break;
      case '222':
        reward = rewardData[2][2];
        break;
      case '333':
        reward = rewardData[3][2];
        break;
      case '444':
        reward = rewardData[4][2];
        break;
      case '555':
        reward = rewardData[5][2];
        break;
      case '666':
        reward = rewardData[6][2];
        break;
      case '777':
        reward = rewardData[7][2];
        break;
      case '888':
        reward = rewardData[8][2];
        break;
      case '999':
        reward = rewardData[9][2];
        break;
      case '000':
        reward = rewardData[10][2];
        break;
      default:
        reward = 0;
        break;

      }
    } else {
      // マッチしなかった場合の処理（ゲームオーバー）
      /* Handling the non-match case (Game over) */

      // reward = 0;
    }
    // 結果に基づいてスコアを計算
    /* Calculate the score based on the result */

    const reward = calculateRewardFromCSV(slotResults);
    const newScore = updateScore(reward);

    // クライアントに結果を返す
    /* Return the result to the client */

    if (slotResultsAreMatching(slotResults)) {
      res.json({ success: true, reward: reward, newScore: newScore });
    } else {
      res.json({ success: false });
    }
  });

module.exports = {
  readCsvFile
}