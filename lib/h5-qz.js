var request = require('request');
var qzUrl = require('./qz-url.js');
var r = request;

exports.init = function (appid, appkey) {
  qzUrl.init(appid, appkey);
};

exports.setProxy = function (url) {
  r = request.defaults({ proxy: url });
};

function reqApi

exports.getUserInfo = function(openid, openkey, cb) {
  var url = qzUrl.getUserInfo(openid, openkey);
  r.get(url, function(err, res, body) {
    var json = {};
    t
  })
}