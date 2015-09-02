var crypto = require('crypto');

exports.hmac = function(key, data) {
  return crypto.createHmac('sha1', key).update(data).digest().toString('base64');
};

exports.uriEncode = function(uri) {
  return encodeURIComponent(uri).replace(/\*/g, '%2A');
};