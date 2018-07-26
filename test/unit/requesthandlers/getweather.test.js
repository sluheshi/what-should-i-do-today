'use strict';

//3rd party
let expect = require('chai').expect;
let rewire = require('rewire');
// Extend chai expectations vocabulary
require('chai').use(require('sinon-chai'));

// Unit under test
var uut = rewire('../../../lib/requesthandlers/getweather.js');

///////////////////////////////////////////////////////////////////////////////
// Unit tests
//

describe('weather tests', function() {

  it('good weather', function() {

    var result = uut.goodOrBadWeather({main: {temp: 32}});
    expect(result).to.eql('good');
  });

  it('bad weather', function() {

    var result = uut.goodOrBadWeather({main: {temp: 15}});
    expect(result).to.eql('bad');
  });

});