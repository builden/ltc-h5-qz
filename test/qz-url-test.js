var expect = require('chai').expect;
var qzUrl = require('../lib/qz-url.js');
var request = require('request');
var moment = require('moment');

// 测试id 棒游记
/*var appid = '1103494063';
var appkey = 'RrNROgbz7vrOQhgP';
var openid = 'D51B9AE97DB8C26A92CCA2793DE0CB8D';
var openkey = '57A3C0B67182F950946863B2C850E257';*/
var appid = '1103869598';
var appkey = 'XeVjRLTGrFJF19GW';
var openid = 'BB741885AFFC555D2CE13DFC776C8601';
var openkey = 'E1B07B137C42CF6F5A33C0307F9405E4';
var pfkey = 'BE65D435F10AF2DB48C9EB716ABB6D29';

describe('qz-url', function () {
  before(function () {
    qzUrl.init(appid, appkey, 'qqgame');
  });

  it('get-user-info not in qcloud', function (done) {
    var url = qzUrl.getUserInfo(openid, openkey);
    // console.log(url);
    expect(url).to.equal('http://openapi.tencentyun.com/v3/user/get_info?appid=1103494063&format=json&openid=D51B9AE97DB8C26A92CCA2793DE0CB8D&openkey=57A3C0B67182F950946863B2C850E257&pf=qzone&sig=gbyDD28s2It45Mo3BsnhwSiQUKo%3D');

    var begTime = moment();
    request(url, function (err, res, body) {
      var json = JSON.parse(body);
      json.spendTime = moment().valueOf() - begTime.valueOf();
      console.log(json);
      expect(json.ret).to.equal(1002);
      done();
    });
  });

  it('get-user-info by proxy', function (done) {
    var url = qzUrl.getUserInfo(openid, openkey);
    var r = request.defaults({ 'proxy': 'http://203.195.202.83:9500' });
    r.get(url, function (err, res, body) {
      var json = JSON.parse(body);
      console.log(json);
      expect(json.ret).to.equal(0);
      done();
    });
  });

/*  it.only('qqgame buy', function (done) {
    qzUrl.switchToQQGameTest();
    var url = qzUrl.qqgameBuy(openid, openkey, 0, pfkey, '123*10*1', '中文*汉字', 'http://203.195.190.211/crayon_test/crayon/originRes/spritesheet_png/common/diamond.png');
    console.log(url);
    var r = request.defaults({ 'proxy': 'http://203.195.202.83:9500' });
    r.get(url, function (err, res, body) {
      if (err) return console.error(err);
      console.log(body);
      var json = JSON.parse(body);
      console.log(json);
      expect(json.ret).to.equal(0);
      done();
    });
  });*/

  /*
  it('update score', function (done) {
    var url = qzUrl.updateScore(openid, openkey, 1000);
    var r = request.defaults({ 'proxy': 'http://203.195.202.83:9500' });
    r.get(url, function (err, res, body) {
      var json = JSON.stringify(body);
      console.log(body);
      done();
    });
  });*/
});