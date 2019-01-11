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

> 错误处理：所有ServerError返回 `{code:0,data:"",message:"isServerError"}` 其它返回 `{code:0,data:"",message:"isClientError"}`


## methodAPI

### createEVTWallet(password)

#### 说明
创建钱包

#### 参数
参数名 | 必选 | 类型 | 说明 
--- | :------: | :-----: | :-----: 
password | 是 | string or number | 密码

#### 返回示例
```
{
	"code": 1,
	"data": {
		"mnemoinc": "napkin slogan rebuild enroll mention section treat elder pole congress fly craft",
		"privateKey": "5JVqzHST8PruyK364KmqjMhLzZn43HM2fCfAv9f5k6PK24jqj9J",
		"publicKey": "EVT6tLW2nEbv78BnLBYHaQx8qsepQ7BvMEcwwFSRBMPHynQ5D2ZdF",
		"password": 123456,
		"type": "EVT"
	},
	"message":""
}
```

### importEVTWallet(mnemoinc, password)

#### 说明
导入钱包

#### 参数
参数名 | 必选 | 类型 | 说明 
--- | :------: | :-----: | :-----: 
mnemoinc | 是 | string | 助记词
password | 是 | string or number | 密码

#### 返回示例
```
{
	"code": 1,
	"data": {
		"mnemoinc": "napkin slogan rebuild enroll mention section treat elder pole congress fly craft",
		"privateKey": "5JVqzHST8PruyK364KmqjMhLzZn43HM2fCfAv9f5k6PK24jqj9J",
		"publicKey": "EVT6tLW2nEbv78BnLBYHaQx8qsepQ7BvMEcwwFSRBMPHynQ5D2ZdF",
		"password": 123456,
		"type": "EVT"
	},
    "message":""
}
```

### EVTInit()
#### 说明
初始化APICaller

#### 参数
无

#### 返回示例
```
{
	"code": 1,
	"data": "",
	"message":""
}
```

### getEVTFungiblesList(publicKeys) 
#### 说明
获取同质化通证详情列表

#### 参数
参数名 | 必选 | 类型 | 说明 
--- | :------: | :-----: | :-----: 
publicKeys | 是 | string | 公钥

#### 返回示例
```
{
	"code": 1,
	"data": [{
		"name": "jaias",
		"sym_name": "JCJC",
		"sym": "5,S#521521521",
		"creator": "EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
		"create_time": "2018-12-15T03:12:49",
		"issue": {
			"name": "issue",
			"threshold": 1,
			"authorizers": [{
				"ref": "[A] EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
				"weight": 1
			}]
		},
		"manage": {
			"name": "manage",
			"threshold": 0,
			"authorizers": []
		},
		"total_supply": "100000.00000 S#521521521",
		"metas": [{
			"key": "symbol-icon",
			"value": "data:image/jpeg;base64,/9j/...",
			"creator": "[A] EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW"
		}],
		"current_supply": "500.00000 S#521521521",
		"address": "EVT0000007AonEYKxAZPkh6z9t9jnSK8vTZkyJwqWq2uW7nritW3H"
	}],
    "message":""
}
```

### getEVTDomainsList(publicKeys) 
#### 说明
获取域详情列表

#### 参数
参数名 | 必选 | 类型 | 说明 
--- | :------: | :-----: | :-----: 
publicKeys | 是 | string | 公钥

#### 返回示例
```
{
	"code": 1,
	"data": [{
		"name": "Joining",
		"creator": "EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
		"create_time": "2018-12-15T03:27:46",
		"issue": {
			"name": "issue",
			"threshold": 1,
			"authorizers": [{
				"ref": "[A] EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
				"weight": 1
			}]
		},
		"transfer": {
			"name": "transfer",
			"threshold": 1,
			"authorizers": [{
				"ref": "[G] .OWNER",
				"weight": 1
			}]
		},
		"manage": {
			"name": "manage",
			"threshold": 1,
			"authorizers": [{
				"ref": "[A] EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
				"weight": 1
			}]
		},
		"metas": [],
		"address": "EVT0000005bc7SoEMn1ffpbXzp3DUzvaBni4QVZ1QcVc7Y8eZfAeB"
	}],
    "message":""
}
```

### getEVTFungibleBalanceList(address,[symbolId]) 
#### 说明
获取用户的同质通证余额详情列表.

#### 参数
参数名 | 必选 | 类型 | 说明 
--- | :------: | :-----: | :-----: 
address | 是 | string | 公钥
symbolId | 否 | number | symbolId

#### 返回示例
```
{
	"code": 1,
	"data": [{
	    "asset": "12.000 S＃1",
		"name": "Pinned.EVT",
		"sym_name": "PEVT",
		"sym": "5,S#2",
		"creator": "EVT6bVAZ9Kax64zCjfA7tYgxTvXMAxjML9LBvLT3tLtgvarTBZJ1J",
		"create_time": "2018-05-31T12:00:00",
		"issue": {
			"name": "issue",
			"threshold": 0,
			"authorizers": []
		},
		"manage": {
			"name": "manage",
			"threshold": 0,
			"authorizers": []
		},
		"total_supply": "0.00000 S#2",
		"metas": [],
		"current_supply": "0.00000 S#2",
		"address": "EVT000000BZoo1h8MWbmP5pkNp7sqZ7oh7CzVjJ6YReB5q3e8YeDm"
	}, {
		"name": "jaias",
		"sym_name": "JCJC",
		"sym": "5,S#521521521",
		"creator": "EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
		"create_time": "2018-12-15T03:12:49",
		"issue": {
			"name": "issue",
			"threshold": 1,
			"authorizers": [{
				"ref": "[A] EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW",
				"weight": 1
			}]
		},
		"manage": {
			"name": "manage",
			"threshold": 0,
			"authorizers": []
		},
		"total_supply": "100000.00000 S#521521521",
		"metas": [{
			"key": "symbol-icon",
			"value": "data:image/jpeg;base64,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",
			"creator": "[A] EVT6Gx3o9P4BAmcjxGenBgmAQ82bgfvS8GHgrFPUPzYUn6uxWdLFW"
		}],
		"current_supply": "500.00000 S#521521521",
		"address": "EVT0000007AonEYKxAZPkh6z9t9jnSK8vTZkyJwqWq2uW7nritW3H"
	}],
	"message": ""
}
```

## evtAPI

这里只列出两个修改了参数的方法（`pushTransaction`、`getEVTLinkQrImage`）,其它方法API请查看[evtAPI文档](https://www.everitoken.io/developers/apis,_sdks_and_tools/javascript_sdk_reference/en_US)

### randomPrivateKey()

### privateToPublic(privateKey)

### seedPrivateKey(seed)

### isValidPrivateKey(key)

### isValidPublicKey(key)

### isValidAddress(address) 

### random32BytesAsHex()

### randomName128()

### getNullAddress()

### EVTInit()

### getInfo()

### getHeadBlockHeaderState()

### getTransactionIdsInBlock(blockId)

### getOwnedTokens(publicKeys)

### getTokens(domain, [skip], [take])

### getManagedGroups(publicKeys)

### getCreatedDomains(publicKeys)

### getCreatedFungibles(publicKeys)

### getActions(params)

### getToken(domain, id)

### getFungibleBalance(address,symbolId) //symbolId is Number

### getTransactionDetailById(id)

### getDomainDetail(name)

### getGroupDetail(name)

### getFungibleActionsByAddress(symbolId, address, skip, take)

### getTransactionsDetailOfPublicKeys(publickeys, skip, take)

### getFungibleSymbolDetail(sym_id)

### getRequiredKeysForSuspendedTransaction(proposalName, availableKeys)

### getStatusOfEvtLink(options) 

### getSuspendedTransactionDetail(proposalName)

### getEstimatedChargeForTransaction(actionName, abiStructure, config)

### generateUnsignedTransaction(actionName, abiStructure, config)

### pushTransaction(actionName, abiStructure, config) 或 pushTransaction('actionName,actionName', [abiStructure,abiStructure], config)
#### 说明
将transaction推送到链. transaction由一些actions组成. 通常, action是可写API的接口. 几乎所有可写API都包含在事务中.

#### 参数
- `actionName`: 动作Name
- `abiStructure`: 由基本类型或/和typedef类型组成的复杂类型
- `config`: 由一些有效字段组成的对象（可选）
  - `maxCharge`：对于任何需要交易费用的交易, 您必须提供此参数以限制您可能收取的最高费用.
  - `expiration`：事务的到期时间（ISO-8601）. 例如：“2018-10-29T02：47：40”.
  - “付款人”：指定哪个用户应支付交易费用. 它是可选的, 如果你没有传递一个值, 它将自动填充keyProvider中的键（如果只提供了一个键）.
  
#### 返回示例
```
{
	"code": 1,
	"data": {
	    transactionId:1
	} ,
	"message": ""
}
```

### getUniqueLinkId()

### getEVTLinkQrImage(qrType, qrParams, imgParams)
#### 说明
为任何类型的“Evt Link”生成QR码图像.

#### 参数
- `qrType`：可以是everiPass, everiPay, payeeCode之一.
- `qrParams`：与getEvtLinkForEveriPass, getEvtLinkForEveriPay和getEvtLinkForPayeeCode的param参数相同. 请参考他们.
- `imgPrams`：有一个名为autoReload的key, 通常你应该将它设置为true.

#### 返回示例
```
{
	"code": 1,
	"data": {
		"dataUrl": "data:image/png;base64,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",
		"rawText": "https://evt.li/03$5CLY539F21:FCRD2-B6URN*98O4SMC:N82YNDXI5LQ$03OFA6ED8HX0AK3OBCTUOLRE7P1ZQDS:5R*MD+",
		"timeConsumed": 5
	},
	"message": ""
}
```

### stopEVTLinkQrImageReload() // 取消getEVTLinkQrImage重新加载，没有返回值

### parseEvtLink(text, options)

### getEvtLinkForEveriPass(params)

### getEvtLinkForEveriPay(params)

### getEvtLinkForPayeeCode(params)



## bip39API

### generateMnemonic()

### mnemonicToSeedHex(words)

### mnemonicToSeed(words,password)
    
### validateMnemonic(mnemonic)
    
### entropyToMnemonic(str)
    
### mnemonicToEntropy(mnemonic)




