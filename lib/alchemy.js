var request = require('request');

var alchemyDomain = "http://access.alchemyapi.com",
    createAlchemyError = function(statusInfo){
      var err = new Error(statusInfo);
      err.name = 'AlchemyError';
      //stack includes this function,
      //so remove one stack level (node.js/chrome only)
      err.stack = err.stack.replace(/\n[^\n]*/, '');
    };
/**
 * Alchemy API constructor
 *
 * @param {String} Alchemy API access key
 */
var Alchemy = function(apiKey){
  this.apiKey = apiKey;
};
Alchemy.prototype._checkForErrorsAndCallback = function(error, resp, data){
  var alchemyError;
  if (data.status == 'ERROR') {
    alchemyError = createAlchemyError(data.statusInfo);
    callback(alchemyError);
  }
  else {
    callback(error, data);
  }
};
Alchemy.prototype._getRequest = function(urlPath, queryParams, callback){
  queryParams = queryParams || {};
  queryParams.apiKey = apiKey;
  var requestOpts = {
    url: alchemyDomain + urlPath,
    qs: queryParams,
    method: "get"
  };
  request(requestOpts, function(error, resp, data){
    this._checkForErrorsAndCallback(error, resp, data, callback);
  });
};
/**
 * API Call: URLGetFeedLinks
 *
 * @param {String} url - http target url for parsing (argument encoded) *required
 * @param {String|Function} outputMode - xml, json, or rdf. default: json
 * @param {Function} callback *required
 * @return this - for chaining
 */
Alchemy.prototype.urlGetFeedLinks = function(url, outputMode, callback){
  if (typeof outputMode == 'function') {
    callback = outputMode;
    outputMode = null;
  }
  outputMode = outputMode || 'json';
  var params = {
    url: url,
    outputMode: outputMode
  };
  this._getRequest("/url/URLGetFeedLinks", params, callback);
  return this;
};
/**
 * API Call: URLGetText - http://www.alchemyapi.com/api/text/urls.html
 *
 * @param {String} url - http target url for parsing (argument encoded) *required
 * @param {Boolean} useMetadata - whether to use description information embedded in web page meta-data. *required
 * @param {Boolean} extractLinks - whether to include hyperlinks in the extracted web page text *required. *required
 * @param {String|Function} outputMode - xml, json, or rdf. default: json
 * @param {Function} callback *required
 * @return this - for chaining
 */
Alchemy.prototype.urlGetText = function(url, useMetadata, extractLinks, outputMode, callback){
  if (typeof outputMode == 'function') {
    callback = outputMode;
    outputMode = null;
  }
  outputMode = outputMode || 'json';
  var params = {
    url: url,
    useMetadata: Number(Boolean(useMetadata)),
    extractLinks: Number(Boolean(extractLinks)),
    outputMode: outputMode
  };
  this._getRequest("/url/URLGetText", params, callback);
  return this;
};
/**
 * API Call: URLGetAuthor
 *
 * @param {String} url - http target url for parsing (argument encoded) *required
 * @param {String|Function} outputMode - xml, json, or rdf. default: json
 * @param {Function} callback *required
 * @return this - for chaining
 */
Alchemy.prototype.urlGetAuthor = function(url, outputMode, callback){
  if (typeof outputMode == 'function') {
    callback = outputMode;
    outputMode = null;
  }
  outputMode = outputMode || 'json';
  var params = {
    url: url,
    outputMode: outputMode
  };
  this._getRequest("/url/URLGetText", params, callback);
};
/**
 * API Call: URLGetCategory - http://www.alchemyapi.com/api/categ/urls.html
 *
 * @param {String} url - http target url for parsing (argument encoded) *required
 * @param {String} sourceText - cleaned_or_raw, cquery, or xpath
 * @param {String} cqueryOrXpath-
 *  cquery - a visual constraints query to apply to the web page. (optional parameter, used when sourceText is set to 'cquery'. must be uri-argument encoded)
 *  xpath - an XPath query to apply to the web page. (optional parameter, used when sourceText is set to 'xpath'. must be uri-argument encoded)
 * @param {String|Function} outputMode - xml, json, rdf, rel-tag, or rel-tag-raw. default: json
 * @param {Function} callback *required
 * @return this - for chaining
 */
Alchemy.prototype.urlGetCategory = function(url, sourceText, cqueryOrXpath, outputMode, baseURL, callback){
  if (typeof outputMode == 'function') {
    callback = outputMode;
    outputMode = null;
    baseURL    = null;
  }
  if (typeof baseURL == 'function') {
    callback = baseURL;
    baseURL  = null;
  }
  outputMode = outputMode || 'json';
  if (outputMode != 'rel-tag' || outputMode != 'rel-tag-raw') {
    baseURL = null;
  }
  var params = {
    url: url,
    outputMode: outputMode
  };
  if (sourceText == 'cquery' || sourceText == 'xpath') {
    params[sourceText] = cqueryOrXpath;
  }
  if (baseURL) {
    params.baseURL = baseURL;
  }
  this._getRequest("/url/URLGetCategory", params, callback);
};


var createInstance = function(apiKey){
  return (new Alchemy(apiKey));
};
module.exports = createInstance;