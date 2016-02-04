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
var openkey = '8C5FE7C4DD2DD7FFB8B159A43043355E';
var pfkey = '6020E19DA7E0396B37DF4B964B581281';

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


/**
 * url:
 *   http://119.147.19.43/v3/pay/buy_goods?appid=1103869598&format=json&goodsmeta=%E4%B8%AD%E6%96%87*%E6%B1%89%E5%AD%97&goodsurl=http://203.195.190.211/crayon_test/crayon/originRes/spritesheet_png/common/diamond.png&openid=BB741885AFFC555D2CE13DFC776C8601&openkey=8C5FE7C4DD2DD7FFB8B159A43043355E&payitem=123*10*1&pf=qqgame&pfkey=6020E19DA7E0396B37DF4B964B581281&ts=1454554561&zoneid=0&sig=eiGwOq6WA5HIp%2BnyGFelISVz2ZI%3D
 *
 * ret:
 * { ret: 0,
  url_params: '/v1/xs1/1103869598/qz_goods_info?token_id=CD4551A8E7E40D904F7C5FE2A9CFD3BF15199&sig=eiGwOq6WA5HIp%2BnyGFelISVz2ZI%3D&appid=1103869598',
  token: 'CD4551A8E7E40D904F7C5FE2A9CFD3BF15199' }
 */
  it('qqgame buy', function (done) {
    qzUrl.switchToQQGameTest();
    var url = qzUrl.qqgameBuy(openid, openkey, 0, pfkey, '123*10*1', 'itemname*desc', 'http://203.195.190.211/crayon_test/crayon/originRes/spritesheet_png/common/diamond.png');
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
  });

  it('check sig', function() {
    expect(qzUrl.checkSig('/v3/pay/buy_goods', {
      appid: '1103869598',
      format: 'json',
      goodsmeta: 'itemname*desc',
      goodsurl: 'http://203.195.190.211/crayon_test/crayon/originRes/spritesheet_png/common/diamond.png',
      openid: 'BB741885AFFC555D2CE13DFC776C8601',
      openkey: '8C5FE7C4DD2DD7FFB8B159A43043355E',
      payitem: '123*10*1',
      pf: 'qqgame',
      pfkey: '6020E19DA7E0396B37DF4B964B581281',
      ts: '1454555913',
      zoneid: '0',
      sig: 'FKz%2BGu5ciF43mQlhUu1B%2FT01ri4%3D',
    })).to.be.ok();
  });

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