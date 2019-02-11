import './utils/evtAPI'
import './utils/bip39API'
import {bridge,errorHandle,randomSymbolId} from './utils/bridge'
import EVT from 'evtjs';
import bip39 from 'bip39'
import axios from 'axios'

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

window.getAPPVersion = async() => {
  let body
  try {
    let res = await axios.get('http://server-config.hzqisheng.cn/versions.json?t='+Date.now())
    if (res.status == 200) {
      body = res.data
    } else {
      const error = new Error('Version fetch failed')
      body = errorHandle(error)
    }
  } catch (e){
    const error = new Error('Version fetch failed')
    body = errorHandle(error)
  }
  bridge('getAPPVersionCallback', body)
}

window.randomValidSymbolId  = () => {
  let time = 0
  let symbolId = 0
  let startStep = 3
  let endStep = 10
  let num = 4
  async function reValid() {
    try {
      if (time < num) {
        symbolId = randomSymbolId(startStep)
        await window.apiCaller.getFungibleSymbolDetail(symbolId)
      } else {
        startStep++
        time = -1
        if(startStep==endStep){
          const error = new Error('random symbolId failed')
          bridge('getRandomValidSymbolId', errorHandle(error))
          return true
        }
      }
      time++
      reValid()
    }catch (error){
      if(error.serverError&&(error.serverError.code === 3040401)){
        bridge('getRandomValidSymbolId', symbolId)
      }else{
        bridge('getRandomValidSymbolId', errorHandle(error))
      }
    }
  }
  reValid()
}
