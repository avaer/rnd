A random string generator. Supports several different modes of operation for different flavors of text.

Useful for generating initial, placeholder, or missing data in forms, games, fiction, etc.

#### API

```
const rnd = require('rnd');

rnd.realName();
// 'Takuya Kusatsu'
// A "real"-looking name that could pass for something in a work of fiction.

rnd.fakeName({gender: 'female'});
// 'Polyth'
// A "fake"-looking name whose only property is that it should be reasonably pronounceable.

rnd.lastName();
// 'Asporix'
// A "last"-looking name suitable as a pronounceable surname.

rnd.noun();
// 'binocle'
rnd.verb();
// 'atomising'
rnd.adjective();
// 'pyrrhic'
rnd.adverb();
// 'kinetically'
// Self-explanatory, chosen from an included dictionary. Good when used in combination.
```
