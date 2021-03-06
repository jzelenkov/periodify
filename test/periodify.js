/* global it */
/* global describe */
var expect = require('expect.js');
var rewire = require('rewire');
var periodify = rewire('../lib/periodify');
var lpref = periodify.__get__('longestPrefix');

var EMPTY_ARRAY = [];
var chain;

describe('longestPrefix', function() {
  it('should return long prefixes correctly', function() {
    expect(lpref('ber')).to.be('Be');
    expect(lpref('b')).to.be('B');
    expect(lpref('besp')).to.be('Be');
    expect(lpref('bex')).to.be('Be');
    expect(lpref('bebebe')).to.be('Be');
    expect(lpref('yb')).to.be('Yb');
  });

  it('should return empty string when no prefix is found', function() {
    expect(lpref('xbe')).to.eql('');
    expect(lpref('x')).to.eql('');
    expect(lpref('')).to.eql('');
  });

  it('should be case-insensitive', function() {
    expect(lpref('Ber')).to.be('Be');
    expect(lpref('BER')).to.be('Be');
    expect(lpref('bER')).to.be('Be');
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
      expect(periodify('b')).to.eql(['B']);
      expect(periodify('h')).to.eql(['H']);
    });

    it('should return empty array for non-existent 1-letter chains', function () {
      expect(periodify('x')).to.eql(EMPTY_ARRAY);
    });
  });
  
  describe('basic scenarios - 2 letters', function() {
    it('should return something for 2-letter chains', function() {
      expect(periodify('be')).to.eql(['Be']);
      expect(periodify('er')).to.eql(['Er']);
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
      expect(chain).to.eql(['Be', 'P', 'S']);
    });

    it('should return something for complex chains 2 (no backtracking)', function() {
      chain = periodify('bepsi');
      expect(chain).to.eql(['Be', 'P', 'Si']);
    });

    it('should return something for complex chains 3 (no backtracking)', function() {
      chain = periodify('bepsiybsibe');
      expect(chain).to.eql(['Be', 'P', 'Si', 'Yb', 'Si', 'Be']);
    });
  });

  describe('backtracking', function() {
    it('should support one-level backtracking', function() {
      chain = periodify('ber');
      expect(chain).to.eql(['B', 'Er']);
    });

    it('should support complex chains with backtracking - berlin', function() {
      chain = periodify('berlin');
      expect(chain).to.eql(['B', 'Er', 'Li', 'N']);
    });

    it('should support complex chains with backtracking - repetitive x1', function() {
      chain = periodify('bebebe');
      expect(chain).to.eql(['Be', 'Be', 'Be']);
    });

    it('should support complex chains with backtracking - repetitive x2', function() {
      chain = periodify('berber');
      expect(chain).to.eql(['Be', 'Rb', 'Er']);
    });

    it('should support complex chains with backtracking - repetitive x3', function() {
      chain = periodify('berberber');
      expect(chain).to.eql(['Be', 'Rb', 'Er', 'B', 'Er']);
    });

    it('should return empty array for failed backtracking', function() {
      chain = periodify('berr');
      expect(chain).to.eql([]);
    });
  });

  describe('special cases', function() {
    it('should check LEFT and RIGHT sides of small expressions', function() {
      chain = periodify('arg');
      expect(chain).to.eql([]);
    });
  });

  describe('ensure simple lookup', function() {
    it('should search by symbol only - Tin (Sn)', function() {
      chain = periodify('tin');
      expect(chain).to.eql(['Ti', 'N']);
    });

    it('should search by symbol only - Iron (Fe)', function() {
      chain = periodify('iron');
      expect(chain).to.eql(['Ir', 'O',  'N']);
    });
  });
});

describe('periodify - fullinfo', function() {
  it('should return full info about chemical element', function() {
    var gold = { number: 79, weight: 196.9665, name: 'Gold', symbol: 'Au' };
    expect(periodify('au', true)[0]).to.eql(gold);
  });

  it('should return full info about multiple chemical elements', function() {
    var f = { number: 9, weight: 18.9984, name: 'Fluorine', symbol: 'F' };
    var ra = { number: 88, weight: 226, name: 'Radium', symbol: 'Ra' };
    var n = { number: 7, weight: 14.0067, name: 'Nitrogen', symbol: 'N' };
    var ce = { number: 58, weight: 140.116, name: 'Cerium', symbol: 'Ce' };

    expect(periodify('france', true)[0]).to.eql(f);
    expect(periodify('france', true)[1]).to.eql(ra);
    expect(periodify('france', true)[2]).to.eql(n);
    expect(periodify('france', true)[3]).to.eql(ce);
  });
});
