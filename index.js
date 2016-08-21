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

const items = (() => {
  const result = [];

  const _getSpecData = spec => {
    const fsKeyPath = spec.fsKeyPath;
    const dataKeyPath = spec.dataKeyPath;
    const preprocessor = spec.preprocessor;

    const requirePath = path.join.apply(path, ['corpora', 'data'].concat(fsKeyPath)) + '.json';
    const rootData = require(requirePath);
    const data = (() => {
      if (dataKeyPath) {
        return _getKeyPath(rootData, dataKeyPath);
      } else if (dataKeyPath) {
        return preprocessor(rootData);
      } else {
        return [];
      }
    })();
    const lowercaseData = data.map(s => s.toLowerCase());
    return lowercaseData;
  };
  const _getKeyPath = (o, keyPath) => {
    for (let i = 0; i < keyPath.length; i++ ){
      const key = keyPath[i];
      o = o[key];
    }

    return o;
  };
  const _birdsPreprocessor = o => {
    const result = [];

    const birds = o.birds;
    for (let i = 0; i < birds.length; i++) {
      const family = birds[i];
      const members = family.members;
      result.push.apply(result, members);
    }

    return result;
  };

  [
    {
      fsKeyPath: [ 'animals', 'birds_antarctica' ],
      preprocessor: _birdsPreprocessor,
    },
    {
      fsKeyPath: [ 'animals', 'birds_north_america' ],
      preprocessor: _birdsPreprocessor,
    },
    {
      fsKeyPath: [ 'animals', 'common' ],
      dataKeyPath: [ 'animals' ],
    },
    {
      fsKeyPath: [ 'animals', 'dinosaurs' ],
      dataKeyPath: [ 'dinosaurs' ],
    },
    {
      fsKeyPath: [ 'animals', 'dogs' ],
      dataKeyPath: [ 'dogs' ],
    },
  ].forEach(spec => {
    const data = _getSpecData(spec);
    result.push.apply(result, data);
  });

  return result;
})();

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
  const names = namegen(4);
  const nameIndex = Math.floor(Math.random() * names.length);
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
api.item = () => {
  const itemIndex = Math.floor(Math.random() * items.length);
  const item = items[itemIndex];
  return item;
};

function _randomGetter(words) {
  return function() {
    return words[Math.floor(Math.random() * words.length)];
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
