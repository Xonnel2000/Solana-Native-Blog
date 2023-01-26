<script>
//import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { adapter, connected, selectedNetwork, getNativeClient } from '$lib/stores';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
export let getBall;



let PubWalletKey 
let walletKey
const drop = async () => {
    PubWalletKey= $walletStore?.publicKey
		walletKey = new PublicKey(PubWalletKey)
		console.log("new wallet",walletKey )
		await $getNativeClient.airDrop(walletKey);
        getBall()
		//getConnectedBalance(); // refresh balance
	};

</script>


{#if $walletStore?.publicKey}
<button class="drop btn btn-md md:btn-md lg:btn-btn-md" on:click|preventDefault={drop}> AirDrop SOL  </button>
{/if}



<style>
	.status {
		margin: 0.5em;
	}
	button.drop {
		background-color: rgb(5, 163, 202);
		text-align: center;
            color: white;



	}

	button.green {
		background-color: #4caf50;
		text-align: center;

	}
	button.yellow {
		background-color: rgb(230, 208, 10);
	}
	button.red {
		background-color: rgb(156, 28, 28);
	}


</style>
