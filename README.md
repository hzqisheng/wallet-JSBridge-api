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

### getOwnedTokens(publicKeys)

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

### pushTransaction(actionName, abiStructure, config)
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
	"data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA9AAAAPQCAYAAADerpPoAAAgAElEQVR4XuzcwY5kyY5kW4///+hoXLz5a0evA+xgqtQ4aULZFKoZ0/PWn79///792f+NwAiMwAiMwAiMwAiMwAiMwAiMwAj8/xL4swN6CRmBERiBERiBERiBERiBERiBERiB/zuBHdDggg==",
	"message": ""
}
```

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




