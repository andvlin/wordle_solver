const CharMap = require('./charMap');
const ANSWER = 'CHEEK';
const WORD_LENGTH = ANSWER.length;
function guess(word, answer = ANSWER) {
  const answerChars = CharMap(answer);
  const pattern = [];
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    const char = answer[i];
    const positions = answerChars.get(word[i]);
    if (word[i] === char) {
      pattern.push('G');
      positions.pop();
    } else if (positions) {
      if (positions.length) {
        pattern.push('?');
      } else {
        pattern.push('B');
      }
    } else {
      pattern.push('B');
    }
  }
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    const color = pattern[i];
    if (color === '?') {
      const char = word[i];
      const positions = answerChars.get(char);
      if (positions && positions.length) {
        pattern[i] = 'Y';
        positions.pop();
      } else {
        pattern[i] = 'B';
      }
    }
  }
  return pattern;
}
module.exports = {
  guess,
};
