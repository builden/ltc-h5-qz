var util = require('./util.js');
var TX_OPEN_SERVER = 'http://openapi.tencentyun.com';

var GET_USER_INFO = '/v3/user/get_info';
var IS_LOGIN = '/v3/user/is_login';
var GET_APP_FRIENDS = '/v3/relation/get_app_friends';
var GET_MULTI_INFO = '/v3/user/get_multi_info';
var BUY = '/v3/user/buy_playzone_item';
var GET_WANBA = '/v3/user/get_playzone_userinfo';
var GET_61_GIFT = '/v3/user/get_gamebar_act';

// 玩吧特有的api
var UPLOAD_SCORE = '/v3/user/set_achievement';

var APPID = null;
var APPKEY = null;
exports.init = function (appid, appkey) {
  APPID = appid;
  APPKEY = appkey;
};

// isWanba 是否是玩吧特有API
function getInitParams(openid, openkey, isWanba) {
  return [
    ['openid', openid],
    ['openkey', openkey],
    ['appid', APPID],
    ['format', 'json'],
    ['pf', (isWanba ? 'wanba_android' : 'qzone')]
  ];
}

function makeSig(method, cmd, params) {
  delete params.fopenids;
  var rst = method.toUpperCase();
  rst += '&' + util.uriEncode(cmd) + '&';
  var str = '';
  for (var i = 0, len = params.length; i < len; i++) {
    (i !== 0) && (str += '&');
    str += params[i][0] + '=' + params[i][1];
  }
  rst += util.uriEncode(str);
  return 'sig=' + util.uriEncode(util.hmac(APPKEY + '&', rst));
}

function ctorUrl(cmd, params) {
  params = params.sort();
  var p = '';
  params.forEach(function (param) {
    p += param[0] + '=' + param[1] + '&';
  });

  return TX_OPEN_SERVER + cmd + '?' + p + makeSig('get', cmd, params);
}

exports.getUserInfo = function (openid, openkey) {
  var params = getInitParams(openid, openkey);
  return ctorUrl(GET_USER_INFO, params);
};

exports.isLogin = function (openid, openkey) {
  var params = getInitParams(openid, openkey);
  return ctorUrl(IS_LOGIN, params);
};

exports.getAppFriends = function (openid, openkey) {
  var params = getInitParams(openid, openkey);
  return ctorUrl(GET_APP_FRIENDS, params);
};

exports.getMultiInfo = function (openid, openkey, fopenids) {
  var params = getInitParams(openid, openkey);
  params.push(['fopenids', fopenids.join('_')]);
  return ctorUrl(GET_MULTI_INFO, params);
};

exports.buy = function (openid, openkey, zoneid, itemid, count) {
  var params = getInitParams(openid, openkey);
  params.push(['zoneid', zoneid]);
  params.push(['itemid', itemid]);
  params.push(['count', count]);
  return ctorUrl(BUY, params);
};

exports.getWanbaInfo = function (openid, openkey, zoneid) {
  var params = getInitParams(openid, openkey);
  params.push(['zoneid', zoneid]);
  return ctorUrl(GET_WANBA, params);
};

exports.get61Gift = function (openid, openkey) {
  var params = getInitParams(openid, openkey);
  return ctorUrl(GET_61_GIFT, params);
};

exports.updateScore = function (openid, openkey, score) {
  var params = getInitParams(openid, openkey, true);
  params.push(['user_attr', '{"level":' + score + '}']);
  return ctorUrl(UPLOAD_SCORE, params);
};