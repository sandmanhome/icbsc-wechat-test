const { Api, JsonRpc, JsSignatureProvider, Numeric } = require('../../miniprogram_npm/icbsc.js/index.js')
const { fetchFunc } = require('../../miniprogram_npm/icbsc-fetch.js/index.js');
const { TextDecoder, TextEncoder } = require('../../miniprogram_npm/icbsc-text-encoding.js/index.js')
const privateKey1 = "PVT_SM2_hrjc7PFDDjSNgGdsP33uXMBeV2abGzNHumnPyMhfhiCbXoKMh"
const privateKeys = [privateKey1];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('http://xxx.xxx.xxx.xxx', { fetch: fetchFunc() });


const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


function transaction() {
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
}

function newKey() {
  let keyPair = Numeric.newKey()
  console.log(keyPair)
  console.log(Numeric.priKeyToPubKey(keyPair.priKey))

}

module.exports = {
  transaction: transaction,
  newKey: newKey,
}