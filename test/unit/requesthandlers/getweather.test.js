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

  it('placeholder', function(done) {

    done();
    //expect(expectedApiEntity).to.eql(result);

  });

});