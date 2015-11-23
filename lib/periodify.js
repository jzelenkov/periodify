var elems = require('./elements');

module.exports = function main (word, fullinfo) {
  var res = periodify(word);

  if (fullinfo) {
    res = expand_results(res);
  }

  return res;
}

function periodify(word) {
  if (!word || word.length === 0) {
    return [];
  }
  word = word.toLowerCase();
  // 1-letter word
  if (word.length === 1) {
    // 1 letter word is present
    if (elems(word)) {
      return [elems(word).symbol];
    } else {
      // 1 letter word is not found. return empty array
      return [];
    }

  // multi-letter word
  } else {
    var left = longestPrefix(word);

    if (left.length === 0) { // no left prefix found. done
      return [];
    } else if (left.length === word.length) { // prefix is the whole word. done
      return [elems(left).symbol];
    } else {
      // some left-prefix found... iterate
      var lside = left;
      var rside = word.substr(left.length, word.length);
      var right_rs;

      for (;lside.length > 0;) {
        right_rs = periodify(rside);
        if (right_rs.length > 0 && elems(lside)) {
          return [].concat(elems(lside).symbol, right_rs);
        }

        // backtracking
        var ch = lside.slice(-1);
        lside = lside.substring(0, lside.length-1);
        rside = ch + rside;
      }

      // for loop didn't return anything...no solution
      return [];
    }
  }
}


function expand_results(res) {
  return res.map(function(each) {
    return elems(each);
  });
}

function longestPrefix(word) {
  word = word.toLowerCase();
  for (var i = word.length; i > 0; i--) {
    var subw = word.substr(0, i);
    if (elems(subw)) {
      return elems(subw).symbol;
    }
  }
  return '';
}
