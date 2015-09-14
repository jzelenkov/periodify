var expect = require('expect.js');
var rewire = require('rewire');
var periodify = rewire('../lib/periodify');
var lpref = periodify.__get__('longestPrefix');

var EMPTY_ARRAY = [];
var chain;

describe('longestPrefix', function() {
  it('should return long prefixes correctly', function() {
    expect(lpref('ber')).to.be('be');
    expect(lpref('b')).to.be('b');
    expect(lpref('besp')).to.be('be');
    expect(lpref('bex')).to.be('be');
    expect(lpref('bebebe')).to.be('be');
    expect(lpref('yb')).to.be('yb');
  });

  it('should return empty string when no prefix is found', function() {
    expect(lpref('xbe')).to.eql('');
    expect(lpref('x')).to.eql('');
    expect(lpref('')).to.eql('');
  });

  it('should be case-insensitive', function() {
    expect(lpref('Ber')).to.be('be');
    expect(lpref('BER')).to.be('be');
    expect(lpref('bER')).to.be('be');
  });
});


describe('periodify', function() {
  describe('constrains', function() {
    it('should return empty array for no input', function() {
      expect(periodify()).to.eql(EMPTY_ARRAY);
    });

    it('should return empty string', function() {
      expect(periodify('')).to.eql(EMPTY_ARRAY);
    });
  });

  describe('basic scenarios - 1 letter', function() {
    it('should return something for 1-letter chains', function() {
      expect(periodify('b')).to.eql(['b']);
      expect(periodify('h')).to.eql(['h']);
    });

    it('should return empty array for non-existent 1-letter chains', function () {
      expect(periodify('x')).to.eql(EMPTY_ARRAY);
    });
  });
  
  describe('basic scenarios - 2 letters', function() {
    it('should return something for 2-letter chains', function() {
      expect(periodify('be')).to.eql(['be']);
      expect(periodify('er')).to.eql(['er']);
    });

    it('should return empty array for non-existent 2-letter chains', function () {
      expect(periodify('bx')).to.eql(EMPTY_ARRAY);
      expect(periodify('zz')).to.eql(EMPTY_ARRAY);
      expect(periodify('zb')).to.eql(EMPTY_ARRAY);
    });
  });

  describe('complex scenarios', function() {
    it('should return something for complex chains 1 (no backtracking)', function() {
      chain = periodify('beps');
      expect(chain).to.eql(['be', 'p', 's']);
    });

    it('should return something for complex chains 2 (no backtracking)', function() {
      chain = periodify('bepsi');
      expect(chain).to.eql(['be', 'p', 'si']);
    });

    it('should return something for complex chains 3 (no backtracking)', function() {
      chain = periodify('bepsiybsibe');
      expect(chain).to.eql(['be', 'p', 'si', 'yb', 'si', 'be']);
    });
  });

  describe('backtracking', function() {
    it('should support one-level backtracking', function() {
      chain = periodify('ber');
      expect(chain).to.eql(['b', 'er']);
    });

    it('should support complex chains with backtracking - berlin', function() {
      chain = periodify('berlin');
      expect(chain).to.eql(['b', 'er', 'li', 'n']);
    });

    it('should support complex chains with backtracking - repetitive x1', function() {
      chain = periodify('bebebe');
      expect(chain).to.eql(['be', 'be', 'be']);
    });

    it('should support complex chains with backtracking - repetitive x2', function() {
      chain = periodify('berber');
      expect(chain).to.eql(['be', 'rb', 'er']);
    });

    it('should support complex chains with backtracking - repetitive x3', function() {
      chain = periodify('berberber');
      expect(chain).to.eql(['be', 'rb', 'er', 'b', 'er']);
    });

    it('should return empty array for failed backtracking', function() {
      chain = periodify('berr');
      expect(chain).to.eql([]);
    });
  });
});
