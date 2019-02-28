/**
 * Created by Administrator on 2018/12/5.
 */

import EVT from 'evtjs';
import {bridge,errorHandle,toJson,toStringify} from './bridge'



// EVT API document
// github => https://www.everitoken.io/developers/apis,_sdks_and_tools/javascript_sdk_reference/en_US

window.randomPrivateKey = async () => {
  let body
  try {
    body = await EVT.EvtKey.randomPrivateKey()
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('randomPrivateKeyCallback', body)
}


window.privateToPublic = (privateKey) => {
  let body
  try {
    body = EVT.EvtKey.privateToPublic(privateKey)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('privateToPublicCallback', body)
}


window.seedPrivateKey = (seed) => {
  let body
  try {
    body = EVT.EvtKey.seedPrivateKey(seed)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('seedPrivateKeyCallback', body)
}


window.isValidPrivateKey = (key) => {
  let body
  try {
    body = EVT.EvtKey.isValidPrivateKey(key)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('isValidPrivateKeyCallback', body)
}


window.isValidPublicKey = (key) => {
  let body
  try {
    body = EVT.EvtKey.isValidPublicKey(key)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('isValidPublicKeyCallback', body)
}


window.isValidAddress = (address) => {
  let body
  try {
    body = EVT.EvtKey.isValidAddress(address)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('isValidAddressCallback', body)
}


window.random32BytesAsHex = async () => {
  let body
  try {
    body = await EVT.EvtKey.random32BytesAsHex()
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('random32BytesAsHexCallback', body)
}


window.randomName128 = async () => {
  let body
  try {
    body = await EVT.EvtKey.randomName128()
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('randomName128Callback', body)
}


window.getNullAddress = () => {
  let body
  try {
    body = EVT.EvtKey.getNullAddress(address)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getNullAddressCallback', body)
}


//apiCaller

let apiCaller = null
window.needPrivateKeyResponse = null

let network = {
  host: 'mainnet14.everitoken.io',
  port: 443,
  protocol: 'https'
};

window.changeNetwork = (obj) => {
  network = toJson(obj)
}

window.checkNetwork = async (network) => {
  let body = ''
  let EVTCopy = EVT({
    endpoint: toJson(network)
  });
  try {
    body = await EVTCopy.getInfo()
  } catch (err) {
    const error = new Error('Invalid node')
    body = errorHandle(error)
  }
  bridge('checkNetworkCallback', body)
}

window.EVTInit = () => {
  let body = ''
  try {
    apiCaller = EVT({
      endpoint: network,
      keyProvider: () => {
        return new Promise((res, rej) => {
          console.log('needPrivateKeyResponse')
          window.needPrivateKeyResponse = res
          if(process.env.NODE_ENV === 'development'){
            res('5JrNgyyNDqz2pikijgdJwUktV8xkS7JPPSURr2YwxkhKPzm2eRi');
          }else{
            bridge('needPrivateKey', '')
          }
        });
      }
    });
    window.apiCaller = apiCaller
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('EVTInitCallback', body)

}


window.getInfo = async () => {
  let body
  try {
    body = await apiCaller.getInfo()
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getInfoCallback', body)
}


window.getHeadBlockHeaderState = async () => {
  let body
  try {
    body = await apiCaller.getHeadBlockHeaderState()
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getHeadBlockHeaderStateCallback', body)
}

window.getTransactionIdsInBlock = async (blockId) => {
  let body
  try {
    body = await apiCaller.getTransactionIdsInBlock(blockId)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getTransactionIdsInBlockCallback', body)
}

window.getOwnedTokens = async (publicKeys) => {
  let body
  try {
    body = await apiCaller.getOwnedTokens(publicKeys)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getOwnedTokensCallback', body)
}


window.getTokens = async (domain, skip = 0, take = 10) => {
  let body
  try {
    body = await apiCaller.getTokens(domain,skip,take)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getTokensCallback', body)
}

window.getManagedGroups = async (publicKeys) => {
  let body
  try {
    body = await apiCaller.getManagedGroups(publicKeys)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getManagedGroupsCallback', body)
}


window.getCreatedDomains = async (publicKeys) => {
  let body
  try {
    body = await apiCaller.getCreatedDomains(publicKeys)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getCreatedDomainsCallback', body)
}


window.getCreatedFungibles = async (publicKeys) => {
  let body
  try {
    body = await apiCaller.getCreatedFungibles(publicKeys)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getCreatedFungiblesCallback', body)
}


window.getActions = async (params) => {
  params = toJson(params)
  let body
  try {
    body = await apiCaller.getActions(params)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getActionsCallback', body)
}


window.getToken = async (domain, id) => {
  let body
  try {
    body = await apiCaller.getToken(domain, id)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getTokenCallback', body)
}


window.getFungibleBalance = async (address, symbolId) => {
  if (typeof symbolId === 'string') {
    symbolId = Number(symbolId)
  }
  let body
  try {
    body = await apiCaller.getFungibleBalance(address, symbolId)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getFungibleBalanceCallback', body)
}


window.getTransactionDetailById = async (id) => {
  let body
  try {
    body = await apiCaller.getTransactionDetailById(id)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getTransactionDetailByIdCallback', body)
}


window.getDomainDetail = async (name) => {
  let body
  try {
    body = await apiCaller.getDomainDetail(name)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getDomainDetailCallback', body)
}


window.getGroupDetail = async (name) => {
  let body
  try {
    body = await apiCaller.getGroupDetail(name)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getGroupDetailCallback', body)
}


window.getFungibleActionsByAddress = async (symbolId, address, skip = 0, take = 10) => {
  let body
  try {
    body = await apiCaller.getFungibleActionsByAddress(symbolId, address, skip, take)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getFungibleActionsByAddressCallback', body)
}


window.getTransactionsDetailOfPublicKeys = async (publickeys, skip = 0, take = 10) => {
  let body
  try {
    body = await apiCaller.getTransactionsDetailOfPublicKeys(publickeys, skip, take)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getTransactionsDetailOfPublicKeysCallback', body)
}


window.getFungibleSymbolDetail = async (sym_id) => {
  let body
  try {
    body = await apiCaller.getFungibleSymbolDetail(sym_id)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getFungibleSymbolDetailCallback', body)
}


window.getRequiredKeysForSuspendedTransaction = async (proposalName, availableKeys) => {
  let body
  try {
    body = await apiCaller.getRequiredKeysForSuspendedTransaction(proposalName, availableKeys)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getRequiredKeysForSuspendedTransactionCallback', body)
}


window.getStatusOfEvtLink = async (options) => {
  options = toJson(options)
  let body
  try {
    body = await apiCaller.getStatusOfEvtLink(options)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getStatusOfEvtLinkCallback', body)
}


window.getSuspendedTransactionDetail = async (proposalName) => {
  let body
  try {
    body = await apiCaller.getSuspendedTransactionDetail(proposalName)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getSuspendedTransactionDetailCallback', body)
}


window.getEstimatedChargeForTransaction = async (newdomain, json, config) => {
  json = toJson(json)
  config = toJson(config)
  let body
  try {
    if (config) {
      body = await apiCaller.getEstimatedChargeForTransaction(config,
        new EVT.EvtAction(newdomain, json)
      )
    } else {
      body = await apiCaller.getEstimatedChargeForTransaction(
        new EVT.EvtAction(newdomain, json)
      )
    }
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getEstimatedChargeForTransactionCallback', body)
}


window.generateUnsignedTransaction = async (newdomain, json, config) => {
  json = toJson(json)
  config = toJson(config)
  let body
  try {
    if (config) {
      body = await apiCaller.generateUnsignedTransaction(config,
        new EVT.EvtAction(newdomain, json)
      )
    } else {
      body = await apiCaller.generateUnsignedTransaction(
        new EVT.EvtAction(newdomain, json)
      )
    }
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('generateUnsignedTransactionCallback', body)
}


window.pushTransaction = async (newdomain, json, config,domain,key) => {
  json = toJson(json)
  config = toJson(config)
  newdomain = newdomain.split(',')
  if(!Array.isArray(json)){
    json = [json]
  }
  let body
  body = []
  newdomain.forEach((item,index) => {
    body.push(new EVT.EvtAction(item, json[index],domain,key))
  })
  try {
    if(config){
      body = await apiCaller.pushTransaction(config,...body)
    }else{
      body = await apiCaller.pushTransaction(...body)
    }
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('pushTransactionCallback', body)
}


// EvtLink
window.getUniqueLinkId = async () => {
  let body
  try {
    body = await EVT.EvtLink.getUniqueLinkId()
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getUniqueLinkIdCallback', body)
}

let intervalId = 0
window.getEVTLinkQrImage = async (qrType, qrParams, imgParams) => {
  qrParams = toJson(qrParams)
  imgParams = toJson(imgParams)
  let body
  try {
    body = await EVT.EvtLink.getEVTLinkQrImage(qrType, qrParams, imgParams, (err, res) => {
      if (err) {
        bridge('getEVTLinkQrImageCallback', errorHandle({isServerError: false}))
        return;
      }
      bridge('getEVTLinkQrImageCallback', res)
    })
    intervalId = body.intervalId
  } catch (error) {
    body = errorHandle(error)
    bridge('getEVTLinkQrImageCallback', body)
  }
}

window.stopEVTLinkQrImageReload = ()=>{
  window.clearInterval(intervalId)
}

window.parseEvtLink = async (text, options) => {
  options = toJson(options)
  let body
  try {
    body = await EVT.EvtLink.parseEvtLink(text, options)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('parseEvtLinkCallback', body)
}


window.getEvtLinkForEveriPass = async (params) => {
  params = toJson(params)
  let body
  try {
    body = await EVT.EvtLink.getEvtLinkForEveriPass(params)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getEvtLinkForEveriPassCallback', body)
}


window.getEvtLinkForEveriPay = async (params) => {
  params = toJson(params)
  let body
  try {
    body = await EVT.EvtLink.getEvtLinkForEveriPay(params)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getEvtLinkForEveriPayCallback', body)
}


window.getEvtLinkForPayeeCode = async (params) => {
  params = toJson(params)
  let body
  try {
    body = await EVT.EvtLink.getEvtLinkForPayeeCode(params)
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('getEvtLinkForPayeeCodeCallback', body)
}




