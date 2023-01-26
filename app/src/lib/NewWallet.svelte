<script>
    	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
		//import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import Airdrp from '$lib/Airdrop.svelte';
	import SendSol from '$lib/SendSol.svelte';
	// import SendToken from '$lib/SendToken.svelte';

import { adapter, connected, selectedNetwork, nativeClient,getNativeClient } from '$lib/stores';





let PubWalletKey 
let walletKey
let myBlogser
let progId
let myBlogs


$:  $getNativeClient && $walletStore?.connected && showAccountBal();

    const showAccountBal = async () => {

// todo: check if valid
//get the adapter from the store which is writable 
//and get it from the helpers/type interface
//myBlogs = await $workSpace.network;
PubWalletKey= $walletStore?.publicKey
walletKey = new PublicKey(PubWalletKey)
myBlogs = await $getNativeClient?.getBalance(walletKey);
};

//$: $anchorClient && showAllNewBlogs();
</script>

<div class="allbutton">
<Airdrp getBall={showAccountBal} /> 
<SendSol />
</div>
<!-- <SendToken /> -->
{#if $walletStore?.publicKey}
<div>My wallet is connected</div>
<h1>Your PubKey: {$walletStore?.publicKey} </h1> 
<h1>Your SOL Bal: {(myBlogs / LAMPORTS_PER_SOL).toFixed(5)} </h1>
{/if}

<!-- <style>
.allbutton{
	display: flex;
		justify-content: space-between;
}

</style> -->