require('dotenv').config();
const { loadWords } = require('./loadWords');
const { updateRules, selectWords, isValidWord } = require('./solver');
const { guess } = require('./wordle');
async function tester() {
  let word = 'CRATE';
  for (let i = 0; i < 6; i += 1) {
    const pattern = guess(word, 'CHEEK');
    updateRules(word, pattern);
    // await loadWords('five_letter_words.csv');
    const words = await selectWords();
    word = words[0].word;
  }
  // const res = isValidWord('CHEEK');
}
tester();
