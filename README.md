# periodify

[![Travis Build Status](https://travis-ci.org/jevzee/periodify.svg?branch=master)](https://travis-ci.org/jevzee/periodify)

Compose words from chemical element symbols.

![berlin](https://cloud.githubusercontent.com/assets/205659/9842049/61e55cae-5a5d-11e5-8f27-7dd7d39ac072.jpg)


### Usage

```js
var periodify = require('periodify');

periodify('berlin');
// ['B', 'Er', 'Li', 'N']

periodify('brandon');
// [ 'B', 'Ra', 'Nd', 'O', 'N' ]

periodify('ireland')
// [ 'I', 'Re', 'La', 'Nd' ]

periodify('austria')
// []
```

### Installation

```sh
npm install periodify
```

### Run Tests

```sh
npm test
```
