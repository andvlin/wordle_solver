const WORD_LENGTH = 5;
function getCharMap(word) {
  const charMap = new Map();
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    const char = word[i];
    const positions = charMap.get(char);
    if (positions) {
      positions.push(i);
    } else {
      charMap.set(char, [i]);
    }
  }
  return charMap;
}
module.exports = getCharMap;
