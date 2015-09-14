var elems = ['h','he','li','be','b','c','n','o','f','ne','na','mg','al','si','p','s','cl','ar','k','ca','sc','ti','v','cr','mn','fe','co','ni','cu','zn','ga','ge','as','se','br','kr','rb','sr', 'y','zr','nb','mo','tc','ru','rh','pd','ag','cd','in','sn','sb','te',' i ','xe','cs','ba', 'la','ce','pr','nd','pm','sm','eu','gd','tb','dy','ho','er','tm','yb','lu','hf','ta','w','re','os','ir','pt','au','hg','tl','pb','bi','po','at','rn','fr','ra', 'ac','th','pa','u','np','pu','am','cm','bk','cf','es','fm','md','no','lr','rf','db','sg','bh','hs','mt','ds','rg','cn','fl','lv'];

module.exports = function periodify (word) {
  if (!word || word.length === 0) {
    return [];
  }
  word = word.toLowerCase();

  debugger;
  // 1-letter word
  if (word.length === 1) {
    // 1 letter word is present
    if (elems.indexOf(word) >= 0) {
      return [elems[elems.indexOf(word)]];
    } else {
      // 1 letter word is not found. return empty array
      return [];
    }

  // multi-letter word
  } else {
    var rs = [];
    var left = longestPrefix(word);

    if(left.length === 0) { // no left prefix found. done
      return [];
    } else if(left.length === word.length) { // prefix is the whole word. done
      return [elems[elems.indexOf(left)]];
    } else {
      // some left-prefix found... iterate
      var lside = left;
      var rside = word.substr(left.length, word.length);
      var right_rs;

      for(;lside.length > 0;) {
        right_rs = periodify(rside);
        if (right_rs.length > 0) {
          return [].concat(lside, right_rs);
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
};

function longestPrefix(word) {
  word = word.toLowerCase();
  for(var i = word.length; i > 0; i--) {
    var subw = word.substr(0, i);
    if (elems.indexOf(subw) >= 0) {
      return elems[elems.indexOf(subw)];
    }
  }
  return '';
}
