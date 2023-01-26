import { getUserProfileClient,getBlogClient } from '$lib/stores';
import { getTokenClient, getNativeClient } from '$lib/stores';


import { get } from 'svelte/store';
//we get the programId from constant which is the deploy programid
//import { programId, MAIN_NET, DEV_NET, config } from '$lib/constants';

//import type { PublicKey } from '$lib/helpers/types';
//import fs from 'mz/fs';


export const BlogGetClient = async () => { 
	//return true or false
	if (!!get(getBlogClient)) return;
	//let useWalleter = get(walletStore)
    //let PubWalletKey= useWalleter?.publicKey
    // let newpublicKey = new PublicKey(PubWalletKey)
	//let cfg = config[get(selectedNetwork)];


	//get the nativeClientfrom lib nativeClient.ts 
	let Blogfunction = await import('$lib/helpers/blogfunction');

	//we update the store with the detail return
	getBlogClient.update((_) => new Blogfunction.default()); // establish our Solana connection & load our little library helpers
};







