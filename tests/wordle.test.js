import test from 'ava';
const { guess } = require('../wordle');
test.serial('Guess test', (t) => {
  const expected = Array.from('GBBBY');
  const pattern = guess('CRATE', 'CHEEK');
  t.deepEqual(pattern, expected);
});
