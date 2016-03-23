"use strict";

const randopeep = require('randopeep');
const randomWordGenerator = require('random-word-generator');
const wordsData = require('./data/compiled.json');

const NAME_ORIGINS = ['dark/elven', 'dwarven', 'elven', 'english', 'germanic', 'japanese', 'orcish', 'spanish', 'netrunner'];

const ADJECTIVES = wordsData.adjectives;
const ADVERBS = wordsData.adverbs;
const NOUNS = wordsData.nouns;
const VERBS = wordsData.verbs;

const api = {};

api.realName = opts => {
  opts = opts || {};

  const gender = opts.gender !== undefined ? opts.gender : (Math.random() < 0.5 ? 'male' : 'female');
  const origin = NAME_ORIGINS[Math.floor(Math.random() * NAME_ORIGINS.length)];
  return randopeep.name({origin, gender, prefix: false, last: true});
};
api.fakeName = opts => {
  opts = opts || {};
  const minCharacters = opts.minCharacters !== undefined ? opts.minCharacters : 3;
  const maxCharacters = opts.maxCharacters !== undefined ? opts.maxCharacters : 10;

  function _makePattern() {
    function _makePatternCharacter() {
      return Math.random() < 0.5 ? 'c' : 'v';
    }

    let result = _makePatternCharacter().toUpperCase();
    const numCharacters = minCharacters + Math.floor(Math.random() * (maxCharacters - minCharacters));
    while (result.length < numCharacters) {
      result += _makePatternCharacter();
      result = result.replace(/(c)c{1,}/gi, '$1').replace(/(v)v{2,}/gi, '$1v')
    }
    return result;
  }

  const rwg = new randomWordGenerator();
  rwg.pattern(_makePattern());
  return rwg.generate();
}
api.adjective = _randomGetter(ADJECTIVES);
api.adverb = _randomGetter(ADVERBS);
api.noun = _randomGetter(NOUNS);
api.verb = _randomGetter(VERBS);

function _randomGetter(words) {
  return function() {
    return words[Math.floor(Math.random() * words.length)];
  };
}

module.exports = api;
