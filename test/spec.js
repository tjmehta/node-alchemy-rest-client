var jasmine = require('jasmine-node');
var apiKey = '362ffb808fa8d2d25fd64fc8c861d8d80edf9dad';
var createAlchemyApi = require('../index.js');

describe('Creating an AlchemyApi instance', function(){
	it('should have a null apiKey until set', function(){
    var alchemyApi = createAlchemyApi();
    expect(alcheymy.apiKey).not.toBeDefined();
  });

  it('should store api token given to the constructor', function(){
		var alchemyApi = createAlchemyApi(apiKey);
		expect(alchemy.apiKey).toEqual(apiKey);
	});
});