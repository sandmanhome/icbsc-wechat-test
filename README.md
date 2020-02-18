### 微信开发者工具 新建小程序项目，本例为 icbsc-wechat-test

### 进入小程序目录，安装依赖包
```
cd icbsc-wechat-test
npm  init
npm install --save icbsc.js
npm install --save buffer
npm install --save icbsc-text-encoding.js
npm install --save icbsc-fetch.js
```

### 微信开发者工具 中构建 npm包
- 点击右上角 详情 按钮，本地设置 勾选 使用npm模块
- 菜单栏中 工具点击 构建npm

### 生成密钥及私钥转公钥
```
const { Numeric } = require('../../miniprogram_npm/icbsc.js/index.js')

// 密钥参数 Numeric.KeyType.sm2 (default)| Numeric.KeyType.r1 ｜ Numeric.KeyType.k1
let keyPair = Numeric.newKey()
console.log(keyPair)

// 私钥转公钥
console.log(Numeric.priKeyToPubKey(keyPair.priKey))

```

### 发送交易
```
const { Api, JsonRpc, JsSignatureProvider } = require('../../miniprogram_npm/icbsc.js/index.js')
const {fetchFunc} = require('../../miniprogram_npm/icbsc-fetch.js/index.js');
const { TextDecoder, TextEncoder } = require('../../miniprogram_npm/icbsc-text-encoding.js/index.js')
const privateKey1 = "PVT_SM2_hrjc7PFDDjSNgGdsP33uXMBeV2abGzNHumnPyMhfhiCbXoKMh"
const privateKeys = [privateKey1];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('http://xxx.xxx.xxx.xxx', { fetch: fetchFunc() });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

api.transact({
  actions: [{
    account: 'icbs.token',
    name: 'transfer',
    authorization: [{
      actor: 'xiaobaiyang3',
      permission: 'active'
    }],
    data: {
      from: 'xiaobaiyang3',
      to: 'icbs',
      quantity: '1.0000 YLZ',
      memo: 'hh'
    }
  }]
}, {
    blocksBehind: 3,
    expireSeconds: 150
  }).then(result => {
    console.log(result)
  }).catch(err => {
    console.log(JSON.stringify(err, null, 2))
  })

```

### 测试
- 本例测试代码详见 pages/icbs-key-utils/test.js
