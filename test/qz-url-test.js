var expect = require('chai').expect;
var qzUrl = require('../lib/qz-url.js');
var request = require('request');

// 测试id 棒游记
var appid = '1103494063';
var appkey = 'RrNROgbz7vrOQhgP';
var openid = 'D51B9AE97DB8C26A92CCA2793DE0CB8D';
var openkey = '57A3C0B67182F950946863B2C850E257';

describe('qz-url', function () {
  before(function () {
    qzUrl.init(appid, appkey);
  });

  it('get-user-info not in qcloud', function (done) {
    var url = qzUrl.getUserInfo(openid, openkey);
    // console.log(url);
    expect(url).to.equal('http://openapi.tencentyun.com/v3/user/get_info?appid=1103494063&format=json&openid=D51B9AE97DB8C26A92CCA2793DE0CB8D&openkey=57A3C0B67182F950946863B2C850E257&pf=qzone&sig=gbyDD28s2It45Mo3BsnhwSiQUKo%3D');

    request(url, function (err, res, body) {
      // console.log(body);
      var json = JSON.parse(body);
      expect(json.ret).to.equal(-4);
      done();
    });
  });

  it('get-user-info by proxy', function (done) {
    var url = qzUrl.getUserInfo(openid, openkey);
    var r = request.defaults({ 'proxy': 'http://203.195.202.83:9500' });
    r.get(url, function (err, res, body) {
      var json = JSON.parse(body);
      expect(json.ret).to.equal(1002);
      done();
    });
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