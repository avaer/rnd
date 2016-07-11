"use strict";

const randopeep = require('randopeep');
const NameGen = require('./lib/namegen-roguelike/namegen.js');
const namegen = require('./lib/namegen-planet/namegen.js');

const wordsData = require('./data/compiled.json');
const roguelikeNames = require('./lib/namegen-roguelike/roguelikenames.js');

const NAME_ORIGINS = ['dark/elven', 'dwarven', 'elven', 'english', 'germanic', 'japanese', 'orcish', 'spanish', 'netrunner'];

const ADJECTIVES = wordsData.adjectives;
const ADVERBS = wordsData.adverbs;
const NOUNS = wordsData.nouns;
const VERBS = wordsData.verbs;

const nameGen = new NameGen(roguelikeNames);

const api = {};

api.realName = opts => {
  opts = opts || {};

  const gender = opts.gender !== undefined ? opts.gender : (Math.random() < 0.5 ? 'male' : 'female');
  const origin = NAME_ORIGINS[Math.floor(Math.random() * NAME_ORIGINS.length)];
  return randopeep.name({origin, gender, prefix: false, last: true});
};
api.fakeName = opts => {
  opts = opts || {};

  const gender = opts.gender || (Math.random() < 0.5 ? 'male' : 'female');
  return _capitalize(nameGen.getName(gender));
};
api.lastName = () => {
  const names = namegen(16);
  const nameIndex = Math.floor(Math.random() * names.length);
  const name = names[nameIndex];
  return _capitalize(name);
};
api.adjective = _randomGetter(ADJECTIVES);
api.adverb = _randomGetter(ADVERBS);
api.noun = _randomGetter(NOUNS);
api.verb = _randomGetter(VERBS);

function _randomGetter(words) {
  return function() {
    return words[Math.floor(Math.random() * words.length)];
  };
}

function _capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

module.exports = api;
