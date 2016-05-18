# periodify

[![Travis Build Status](https://travis-ci.org/jzelenkov/periodify.svg?branch=master)](https://travis-ci.org/jzelenkov/periodify)

Compose words from chemical element symbols.

![berlin](https://cloud.githubusercontent.com/assets/205659/9842049/61e55cae-5a5d-11e5-8f27-7dd7d39ac072.jpg)


### Usage

```js
var periodify = require('periodify');

periodify('berlin');
// ['B', 'Er', 'Li', 'N']

periodify('brandon');
// [ 'B', 'Ra', 'Nd', 'O', 'N' ]

periodify('ireland');
// [ 'I', 'Re', 'La', 'Nd' ]

periodify('austria');
// []
```

Pass optional parameter to get full info about each chemical element:
```js
periodify('france', true);
// [
//   { number: 9, weight: 18.9984, name: 'Fluorine', symbol: 'F' },
//   { number: 88, weight: 226, name: 'Radium', symbol: 'Ra' },
//   { number: 7, weight: 14.0067, name: 'Nitrogen', symbol: 'N' },
//   { number: 58, weight: 140.116, name: 'Cerium', symbol: 'Ce' }
// ]
```


### Installation

```sh
npm install periodify
```


### Run Tests

```sh
npm test
```
