/**
 * Created by Administrator on 2018/12/6.
 */
import bip39 from 'bip39'
import {bridge} from './bridge'


// Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
window.generateMnemonic = () => {
  let body = bip39.generateMnemonic(words)
  bridge('generateMnemonicCallback',body)
}

// mnemonic to seedHex
window.mnemonicToSeedHex = (words) => {
  let body = bip39.mnemonicToSeedHex(words)
  bridge('mnemonicToSeedHexCallback',body)
}

// mnemonic to seed
window.mnemonicToSeed = (words,password) => {
  let body
  if(password){
    body = bip39.mnemonicToSeed(words,password)
  }else{
    body = bip39.mnemonicToSeed(words)
  }
  bridge('mnemonicToSeedCallback',body)
}

// validate mnemonic
window.validateMnemonic = (mnemonic) => {
  let body = bip39.validateMnemonic(mnemonic)
  bridge('validateMnemonicCallback',body)
}

// defaults to BIP39 English word list
// uses HEX strings for entropy
window.entropyToMnemonic = (str) => {
  let body = bip39.entropyToMnemonic(str)
  bridge('entropyToMnemonicCallback',body)
}

// uses mnemonic for HEX
window.mnemonicToEntropy = (mnemonic) => {
  let body = bip39.mnemonicToEntropy(mnemonic)
  bridge('mnemonicToEntropyCallback',body)
}



