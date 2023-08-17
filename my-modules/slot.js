const fs = require('fs'); // import fs module

// jsonファイルからゲームの設定情報を読み込む(スロットのスタートナンバー、初期スピード、初期スコア)
// read the setting information of slot game from json (initial slot number, initial speed, initial score)
const gameSettings = JSON.parse(fs.readFileSync('slot.json', 'utf8'));

// CSVファイルを読み込む関数
// read CSV
function readCsvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const entry = {};
    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j];
    }
    data.push(entry);
  }

  return data;
}

// CSVファイルから得点情報を読み込む
// read the reward information from CSV 
const scoreData = readCsvFile('slot-rewards.csv');
console.log(scoreData);


// スロットの結果から得点を取得する関数
// get 
function getScoreForCombination(combination) {
    const scoreEntry = scoreData.find(entry => entry.combination === combination);
    return scoreEntry ? parseInt(scoreEntry.score) : 0;
  }
  
  // 使用例
  const obtainedCombination = '222';
  const obtainedScore = getScoreForCombination(obtainedCombination);
  console.log(`得点: ${obtainedScore}`);



// GET POST PUT(PATCH)
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

/* let score = 0; // 初期スコア initial score */

// GETリクエストでスコアを取得
app.get('/score', (req, res) => {
  res.json({ score });
});

// POSTリクエストでスコアを更新
app.post('/score', (req, res) => {
  const { newScore } = req.body;
  score = newScore;
  res.json({ message: 'Score updated successfully' });
});

// PUTリクエストでスコアを増加
app.put('/score', (req, res) => {
  score += 1;
  res.json({ message: 'Score increased successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});