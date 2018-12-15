# wallet

## Project setup
```
npm install OR yarn install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# methods 

> 说明:所有方法的回调都是'方法名'+Callback。 如：createEVTWalletCallback

> 在调用evtAPI之前先调用EVTInit()初始化。 [evtAPI文档](https://www.everitoken.io/developers/apis,_sdks_and_tools/javascript_sdk_reference/en_US)

> 注意:有一个隐藏needPrivateKey方法是让APP弹出密码框，用needPrivateKeyResponse(privateKey)返回私钥

> 错误处理：所有ServerError返回 `isServerError` 其它返回 `isClientError`




```js

// methodAPI
createEVTWallet(password)

importEVTWallet(mnemoinc, password)

getEVTFungiblesList(publicKeys) 



// evtAPI

// 注意:有一个隐藏needPrivateKey方法是让APP弹出密码框，用needPrivateKeyResponse(privateKey)返回私钥


randomPrivateKey()

privateToPublic(privateKey)

seedPrivateKey(seed)

isValidPrivateKey(key)

isValidPublicKey(key)

isValidAddress(address) 

random32BytesAsHex()

randomName128()

getNullAddress()

EVTInit()

getInfo()

getHeadBlockHeaderState()

getOwnedTokens(publicKeys)

getManagedGroups(publicKeys)

getCreatedDomains(publicKeys)

getCreatedFungibles(publicKeys)

getActions(params)

getToken(domain, id)

getFungibleBalance(address,symbolId) //symbolId is Number

getTransactionDetailById(id)

getDomainDetail(name)

getGroupDetail(name)

getFungibleActionsByAddress(symbolId, address, skip, take)
// =>getFungibleActionsByAddress(655312434,'EVT5qn48E8eZKJb5yM24bgC1m8MdRFg5eBU76cQfDXBGXr3UYjLvY')

getTransactionsDetailOfPublicKeys(publickeys, skip, take)

getFungibleSymbolDetail(sym_id)

getRequiredKeysForSuspendedTransaction(proposalName, availableKeys)

getStatusOfEvtLink(options) 

getSuspendedTransactionDetail(proposalName)

getEstimatedChargeForTransaction(actionName, abiStructure, config)

generateUnsignedTransaction(actionName, abiStructure, config)

pushTransaction(actionName, abiStructure, config)

getUniqueLinkId()

getEVTLinkQrImage(qrType, qrParams, imgParams)

parseEvtLink(text, options)

getEvtLinkForEveriPass(params)

getEvtLinkForEveriPay(params)

getEvtLinkForPayeeCode(params)


// bip39 API

generateMnemonic()

mnemonicToSeedHex(words)

mnemonicToSeed(words,password)

validateMnemonic(mnemonic)

entropyToMnemonic(str)

mnemonicToEntropy(mnemonic)

```
