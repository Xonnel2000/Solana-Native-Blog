import { clusterApiUrl, PublicKey } from '@solana/web3.js'
//import facebook_clone from '$lib/idl/anchorblog.json'
//import idl from '$lib/idl/anchorblog.json';

import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { get } from 'svelte/store';


export const CLUSTER =
  process.env.REACT_APP_CLUSTER === 'mainnet'
    ? 'mainnet'
    : process.env.REACT_APP_CLUSTER === 'testnet'
    ? 'testnet'
    : 'devnet'

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
  : CLUSTER === 'mainnet'
  ? clusterApiUrl('mainnet-beta')
  : CLUSTER === 'testnet'
  ? clusterApiUrl('devnet')
  : 'https://api.devnet.solana.com'

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
  'AnLY9v4vt4GyJDqtspDC8Bo6veCwgH42thi4cWThJubu',
)


export const LENNOX_MINT = new PublicKey(
  '5MWENiQQ6RMvj1ftWhxP1w4fXWfc4UuaJuxPx3UALGFE',
)

export const DODO_MINT = new PublicKey(
  '6CBRDQgwd2hQ7ARJY7gdyNJ4NJ2tX5dW6RSEXLqdwYAE',
)

export const LENNOX_TokenAccount = new PublicKey('HhFxcEqNbbrRpY19JaEtThojaDqB1oZcThPaTxHbonYt');


export const DODO_TokenAccount = new PublicKey('4Af6kq337f67WYaSaHYMiB6f8qdt8A8eHtYN92nQeFYz');

//export const STABLE_POOL_IDL = facebook_clone


// let PubWalletKey 
//     let useWallet
//     let  newpublicKey

//    useWallet = get(walletStore)
//    PubWalletKey= useWallet?.publicKey
//    newpublicKey = new PublicKey(PubWalletKey)

//    export const WALLETKEY  = newpublicKey

//    export const GETWALLETKEY = get(walletStore)
