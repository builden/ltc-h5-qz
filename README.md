# ltc-h5-qz
h5 qz sdk

## How to use
```js
var qz = require('ltc-h5-qz');
// pf 默认是qzone, 支持qqgame
qz.init(appid, appkey, pf = 'qzone');

// 超时时长为5s
// err.code = ETIMEDOUT / EPARSED(转JSON失败)
qz.getUserInfo(openid, openkey, function(err, json) {
});

// 签名检测, 用于openApi的回调接口
qz.checkSign(pathname, query);
```

## Installation
```sh
npm install --save ltc-h5-qz
```

## Tests
```sh
npm install
npm test
```