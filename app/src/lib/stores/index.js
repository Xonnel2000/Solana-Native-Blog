import { derived, writable, get } from 'svelte/store';
//this load the select  network type from constants
import { MAIN_NETS, DEV_NETS, APP_WALLET, ADAPTER } from '$lib/constants';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { PublicKey, } from '@solana/web3.js';
let PubWalletKey;
let walletKey;
let Mintaddress;
let useWallet;
let newpublicKey;
let loaded;
let ImmortalDB = new Promise((resolve, reject) => {
    loaded = resolve;
});
/** the wallet adapter from sollet, etc
 * this acces to the interface from helpers/types
 * which is typescript interface
 */
export const adapter = writable(undefined);
/** is the wallet connected? */
//Derives a store from one or more other stores. Whenever those dependencies change, the callback runs.
export const connected = derived(adapter, ($adapter) => {
    if ($adapter && $adapter.publicKey) {
        return true;
    }
    return false;
});
export const walletconnected = derived(walletStore, ($walletStore) => {
    PubWalletKey = $walletStore?.publicKey;
    newpublicKey = new PublicKey(PubWalletKey);
    return newpublicKey;
});
// export function getsum(){
// 	return get
// }
// useWallet = get(walletStore)
// PubWalletKey= useWallet?.publicKey
// newpublicKey = new PublicKey(PubWalletKey)
// console.log("this is wallet", newpublicKey.toString())
export const selectedNetwork = writable(DEV_NETS);
export const selectedWallet = writable(!APP_WALLET);
export const nativeClient = writable(null);
export const getTokenClient = writable(null);
export const getNativeClient = writable(null);
export const getUserProfileClient = writable(null);
export const getBlogClient = writable(null);
