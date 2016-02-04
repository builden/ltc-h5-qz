var moment = require('moment');
var request = require('request');
var qzUrl = require('./qz-url.js');
var r = request;

exports.init = function (appid, appkey, pf) {
  qzUrl.init(appid, appkey, pf);
};

exports.checkSig = function (pathname, query) {
  return qzUrl.checkSig(pathname, query);
};

// 只在QQGame的测试环境需要使用
exports.switchToQQGameTest = function () {
  qzUrl.switchToQQGameTest();
}

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
  var url = qzUrl.updateScore(openid, openkey, score);
  reqApi(url, cb);
};

// http://wiki.open.qq.com/wiki/v3/pay/buy_goods
/**
 * @param  {any} openid
 * @param  {any} openkey
 * @param  {any} zoneid
 * @param  {any} pfkey
 * @param  {any} payitem - 'itemid*price*num' price的  单位是Q点
 * @param  {any} goodsmeta - 名字加描述 'name*desc'
 * @param  {any} goodsurl - 道具icon的url, 116*116
 * @param  {any} cb
 */
exports.qqgameBuy = function (openid, openkey, zoneid, pfkey, payitem, goodsmeta, goodsurl, cb) {
  var url = qzUrl.qqgameBuy(openid, openkey, zoneid, pfkey, payitem, goodsmeta, goodsurl);
  reqApi(url, cb);
}

// http://wiki.open.qq.com/wiki/v3/pay/confirm_delivery
/**
 * @param  {any} openid
 * @param  {any} zoneid
 * @param  {any} payitem
 * @param  {any} token_id
 * @param  {any} billno
 * @param  {any} version
 * @param  {any} providetype
 * @param  {any} provide_errno
 * @param  {any} provide_errmsg
 * @param  {any} amt
 * @param  {any} payamt_coins
 * @param  {any} pubacct_payamt_coins
 * @param  {any} cb
 */
exports.qqgameConfirmDelivery = function (openid, zoneid, payitem, token_id, billno, version, providetype, provide_errno, provide_errmsg, amt, payamt_coins, pubacct_payamt_coins, cb) {
  var url = qzUrl.qqgameConfirmDelivery(openid, zoneid, payitem, token_id, billno, version, providetype, provide_errno, provide_errmsg, amt, payamt_coins, pubacct_payamt_coins);
  reqApi(url, cb);
}

// http://wiki.open.qq.com/wiki/v3/user/blue_vip_info
exports.qqgameGetBlueVipInfo = function (openid, openkey, cb) {
  var url = qzUrl.qqgameGetBlueVipInfo(openid, openkey);
  reqApi(url, cb);
}

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