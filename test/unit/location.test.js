'use strict';

//3rd party
let expect = require('chai').expect;
let rewire = require('rewire');
let sinon = require('sinon');
let httpMocks = require('node-mocks-http');
// Extend chai expectations vocabulary
require('chai').use(require('sinon-chai'));

// Unit under test
var uut = rewire('../../lib/location.js');

///////////////////////////////////////////////////////////////////////////////
// Unit tests
//

describe('location handler tests', function() {
  let sandbox;
  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  beforeEach(function() {
    sandbox.restore();;
  });
  it('placeholder', function(done) {

    //Setup mocked responses from 3rd party APIs

    done();
    //expect(expectedApiEntity).to.eql(result);

  });

});