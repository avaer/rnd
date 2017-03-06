"use strict";

const Alea = require('alea');
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

  const gender = opts.gender !== undefined ? opts.gender : (rng() < 0.5 ? 'male' : 'female');
  const origin = NAME_ORIGINS[Math.floor(rng() * NAME_ORIGINS.length)];
  return randopeep.name({origin, gender, prefix: false, last: true});
};
api.fakeName = opts => {
  opts = opts || {};

  const gender = opts.gender || (rng() < 0.5 ? 'male' : 'female');
  return _capitalize(nameGen.getName(gender));
};
api.lastName = () => {
  const names = namegen(4);
  const nameIndex = Math.floor(rng() * names.length);
  const name = names[nameIndex];
  return _capitalize(name);
};
api.adjective = _randomGetter(ADJECTIVES);
api.adjectives = _getter(ADJECTIVES);
api.adverb = _randomGetter(ADVERBS);
api.adverbs = _getter(ADVERBS);
api.noun = _randomGetter(NOUNS);
api.nouns = _getter(NOUNS);
api.verb = _randomGetter(VERBS);
api.verbs = _getter(VERBS);

let rng = () => Math.random();
api.setSeed = text => {
  rng = new Alea(text);
};

function _randomGetter(words) {
  return function() {
    return words[Math.floor(rng() * words.length)];
  };
}

function _getter(words) {
  return function() {
    return words;
  };
}

function _capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

module.exports = api;
