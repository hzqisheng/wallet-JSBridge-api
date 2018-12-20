import './utils/evtAPI'
import './utils/bip39API'
import {bridge,errorHandle} from './utils/bridge'
import EVT from 'evtjs';
import bip39 from 'bip39'


// create EVTWallet
window.createEVTWallet = async (password) => {
  let body
  try {
    // random 16bytes as hex
    let entropy = (await  EVT.EvtKey.random32BytesAsHex()).substring(32);

    // uses HEX strings for entropy
    let mnemoinc = bip39.entropyToMnemonic(entropy);

    let seed = bip39.mnemonicToSeedHex(mnemoinc);
    let privateKey = await EVT.EvtKey.seedPrivateKey(seed);
    let publicKey = EVT.EvtKey.privateToPublic(privateKey);

    body = {
      mnemoinc: mnemoinc,
      privateKey: privateKey,
      publicKey: publicKey,
      password: password,
      type: 'EVT'
    }
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('createEVTWalletCallback', body)
}

// import EVTWallet
window.importEVTWallet = async (mnemoinc, password) => {

  let body
  try {
    let seed = bip39.mnemonicToSeedHex(mnemoinc);
    let privateKey = await EVT.EvtKey.seedPrivateKey(seed);
    let publicKey = EVT.EvtKey.privateToPublic(privateKey)

    body = {
      mnemoinc: mnemoinc,
      privateKey: privateKey,
      publicKey: publicKey,
      password: password,
      type: 'EVT'
    }
  } catch (error) {
    body = errorHandle(error)
  }
  bridge('importEVTWalletCallback', body)
}

window.getEVTFungiblesList = async(publicKeys)=>{
  let body = []
  try {
    let arr = await window.apiCaller.getCreatedFungibles(publicKeys)
    console.log(arr)
    arr.ids.forEach(item => {
      let detail = window.apiCaller.getFungibleSymbolDetail(item)
      body.push(detail)
    })
    Promise.all(body).then((result)=>{
      bridge('getEVTFungiblesListCallback', result)
    }).catch((error)=>{
      body = errorHandle(error)
      bridge('getEVTFungiblesListCallback', body)
    })
  } catch (error) {
    body = errorHandle(error)
    bridge('getEVTFungiblesListCallback', body)
  }
}


window.getEVTDomainsList = async(publicKeys)=>{
  let body = []
  try {
    let arr = await window.apiCaller.getCreatedDomains(publicKeys)
    arr.forEach(item => {
      let detail = window.apiCaller.getDomainDetail(item.name)
      body.push(detail)
    })
    Promise.all(body).then((result)=>{
      bridge('getEVTDomainsListCallback', result)
    }).catch((error)=>{
      body = errorHandle(error)
      bridge('getEVTDomainsListCallback', body)
    })
  } catch (error) {
    body = errorHandle(error)
    bridge('getEVTDomainsListCallback', body)
  }
}


window.getEVTFungibleBalanceList = async(publicKeys,symbolId)=>{
  let body = []
  try {
    let arr = await window.apiCaller.getFungibleBalance(publicKeys,symbolId)
    arr.forEach(item => {
      let detail = window.apiCaller.getFungibleSymbolDetail(Number(item.split('#')[1]))
      body.push(detail)
    })
    Promise.all(body).then((result)=>{
      arr.forEach((item,i)=>{
        result[i].asset = item
      })
      bridge('getEVTFungibleBalanceListCallback', result)
    }).catch((error)=>{
      body = errorHandle(error)
      bridge('getEVTFungibleBalanceListCallback', body)
    })
  } catch (error) {
    body = errorHandle(error)
    bridge('getEVTFungibleBalanceListCallback', body)
  }
}



