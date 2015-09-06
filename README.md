# ltc-h5-qz
h5 qz sdk

## How to use
```js
var qz = require('ltc-h5-qz');
qz.init(appid, appkey);

// 超时时长为5s
// err.code = ETIMEDOUT / EPARSED(转JSON失败)
qz.getUserInfo(openid, openkey, function(err, json) {
});
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