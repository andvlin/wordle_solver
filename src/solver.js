const mysql = require('./mysqlutils');
const WORD_LENGTH = 5;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const state = Array.from({ length: WORD_LENGTH }, (e) => Array.from(ALPHABET));
const yellowChars = new Map(); // map of characters to possible positions in word ex. { 'C': [true, true, false, true, true]}
const blackChars = new Map(); // map of ruled out characters, excluding already positioned ones
/*
AXIS
XXXS
0 ABC
1 ABC
2 ABC
3 ABC
4 ABC
5 ABC
*/
function findUniquePosition(positions) {
  let foundSolution = false;
  let index = -1;
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (positions[i]) {
      if (foundSolution) {
        // not unique
        return -1;
      }
      foundSolution = true;
      index = i;
    }
  }
  return index;
}
function updateRules(guess, result) {
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    const char = guess[i];
    const isSeen = yellowChars.get(char);
    if (result[i] === 'B') {
      let j = i;
      if (!isSeen) {
        j = 0;
      }
      for (; j < WORD_LENGTH; j += 1) {
        if (state[j].length !== 1) {
          const index = state[j].indexOf(char);
          if (index !== -1) {
            state[j].splice(index, 1);
          }
        }
      }
    } else if (result[i] === 'Y') {
      const index = state[i].indexOf(char);
      if (index !== -1) {
        state[i].splice(index, 1);
      }
      if (isSeen) {
        isSeen[i] = false;
        const uniquePosition = findUniquePosition(isSeen);
        if (uniquePosition !== -1) {
          state[uniquePosition] = [char];
        }
      } else {
        const positions = new Array(WORD_LENGTH).fill(true);
        positions[i] = false;
        yellowChars.set(char, positions);
      }
    } else {
      state[i] = [char];
    }
  }
  console.log('HI');
}
function isValidWord(word) {
  const mustSeeChars = [...yellowChars.keys()];
  for (let i = 0; i < word.length; i += 1) {
    const char = word[i];
    if (state[i].indexOf(char) === -1) {
      return false;
    }
    const isSeen = yellowChars.get(char);
    if (isSeen) {
      if (isSeen[i] === false) {
        return false;
      }
      const index = mustSeeChars.indexOf(char);
      if (index !== -1) {
        mustSeeChars.splice(index, 1);
      }
    }
  }
  if (mustSeeChars.length) {
    return false;
  }
  return true;
}
async function selectWords() {
  const connection = await mysql.connect();
  const query = `SELECT word, (numGuesses / numWins) AS avgGuesses FROM wordle
  ORDER BY avgGuesses`;
  const res = await connection.query(query);
  if (res && res[0] && res[0].length) {
    const validWords = res[0].filter((e) => isValidWord(e.word));
    return validWords;
  }
  return [];
}
function getValidWords() {
}
module.exports = {
  updateRules, selectWords, getValidWords, isValidWord,
};
