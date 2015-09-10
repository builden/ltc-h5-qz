var moment = require('moment');
var request = require('request');
var qzUrl = require('./qz-url.js');
var r = request;

exports.init = function (appid, appkey) {
  qzUrl.init(appid, appkey);
};

exports.setProxy = function (url) {
  r = request.defaults({ proxy: url });
};

// http://wiki.open.qq.com/wiki/v3/user/get_info
exports.getUserInfo = function (openid, openkey, cb) {
  var url = qzUrl.getUserInfo(openid, openkey);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/user/is_login
exports.isLogin = function (openid, openkey, cb) {
  var url = qzUrl.isLogin(openid, openkey);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/relation/get_app_friends
exports.getAppFriends = function (openid, openkey, cb) {
  var url = qzUrl.getAppFriends(openid, openkey);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/user/get_multi_info
exports.getMultiInfo = function (openid, openkey, fopenids, cb) {
  var url = qzUrl.getMultiInfo(openid, openkey, fopenids);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/user/buy_playzone_item
exports.buy = function (openid, openkey, zoneid, itemid, count, cb) {
  var url = qzUrl.buy(openid, openkey, zoneid, itemid, count);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/user/get_playzone_userinfo
exports.getWanbaInfo = function (openid, openkey, zoneid, cb) {
  var url = qzUrl.getWanbaInfo(openid, openkey, zoneid);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/user/get_gamebar_act
exports.get61Gift = function (openid, openkey, cb) {
  var url = qzUrl.get61Gift(openid, openkey);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/user/set_achievement
exports.updateScore = function (openid, openkey, score, cb) {
  var url = qzUrl.updateScore(openid, openkey);
  reqApi(url, cb);
};

function reqApi(url, cb) {
  var begTime = moment();
  r.get(url, { timeout: 5000 }, function (err, res, body) {
    var json = {};
    try {
      json = JSON.parse(body);
      json.spendTime = moment().valueOf() - begTime.valueOf();
    } catch (e) {
      cb && cb({ code: 'EPARSED' }, body);
      return;
    }
    cb && cb(err, json);
  });
}