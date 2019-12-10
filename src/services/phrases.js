export const EXISTING_PHRASES = [
  'learn',
  'eat',
  'sleep',
  'eat well'
];

/**
 * @param {string} phrase 
 * @returns {object}
 */
export function testSimilarPhrases(phrase) {
  

  const similarPhrases = EXISTING_PHRASES.filter(p => p.includes(phrase));

  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        conflicting: similarPhrases,
        unique: !Boolean(similarPhrases.length),
      });
    }, 500);
  });
}

export function createPhrase(phrase) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({ phrase, created: new Date().toISOString() });
    }, 700);
  });
}