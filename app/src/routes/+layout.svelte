<script lang="ts">
	import "../app.postcss";
    //import "../app.postcss";
	import Header from '$lib/header/Header.svelte';
import {get} from 'svelte/store'
import "./styles.css";


    import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
    import { onMount } from 'svelte';
	import { UserProfileClient ,NativeClient } from '$lib/helpers/utils';
	import { BlogGetClient } from '$lib/helpers/blogutili';
	import NewWallet from '$lib/NewWallet.svelte';



	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
    let loaded;

    let wallets: any;
	const localStorageKey = 'walletAdapter';

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    let network

    network = clusterApiUrl('devnet'); // localhost or mainnet

onMount(async () => {
	const {
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	TorusWalletAdapter,
	} = await import('@solana/wallet-adapter-wallets');

	const walletsMap = [
		new PhantomWalletAdapter(),
		new SlopeWalletAdapter(),
		new SolflareWalletAdapter(),
		new SolletExtensionWalletAdapter(),
		new TorusWalletAdapter(),
	];

	wallets = walletsMap;
	walletStore
	await UserProfileClient();
	await BlogGetClient();
	await NativeClient()
	
});

    let PubWalletKey
    let walletKey


    //check to see of the wallet is connected
    const showAccountBal = async () => {
    PubWalletKey= $walletStore?.publicKey
    walletKey = new PublicKey(PubWalletKey)
    };

    //$: $anchorClient && showAllNewBlogs();
    $:  $walletStore?.connected && showAccountBal();
   
  </script>

  
  <WalletProvider {localStorageKey} {wallets} autoConnect />

  
  
	<Header />
	<h1>Please connect your wallet to access this site</h1>
	<WalletMultiButton />



	{#if $walletStore?.connected}
<!-- <div>My wallet is connected {$walletStore?.publicKey}</div> -->

  <main class="sm:m-auto md:m-auto">
  <NewWallet />

  <slot></slot>
  </main>
  {:else}
  Loading...
  {/if}
  
  <style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
		main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
  
	  /* footer {
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
		  padding: 40px;
	  }
  
	  footer a {
		  font-weight: bold;
	  }
  
	  @media (min-width: 480px) {
		  footer {
			  padding: 40px 0;
		  }
	  } */
  </style>
  