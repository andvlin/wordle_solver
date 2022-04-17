const fs = require('fs');
const mysql = require('./mysqlutils');
function getWordsFromFile(filePath) {
  const words = fs.readFileSync(filePath).toString().split('\r\n');
  const nestedWords = words.map((e) => [e.trim().toUpperCase()]);
  return nestedWords;
}
function chunker(arr, size) {
  const cache = [];
  const tmp = [...arr];
  while (tmp.length) cache.push(tmp.slice(0, size));
  return cache;
}
async function loadWords(filePath) {
  try {
    const connection = await mysql.connect();
    const words = getWordsFromFile(filePath);
    const text = 'INSERT INTO wordle (word) VALUES ?';
    const res = await connection.query(text, [words]);
    console.log(`${words.length} loaded`);
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}
module.exports = {
  loadWords,
};
